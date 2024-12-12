import catchAsync from "../utils/catchAsync.js";
import client from '../dbConfig.js'
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


const authController = {
	touristSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate, Nationality, Language } = req.body;
		const user = await client.query(
			"SELECT * FROM Tourist WHERE UserName = $1 OR Email = $2", 
			[UserName, Email]
		);
		if (user.rows.length)
			return res.status(400).json({ message: "User already exists" });
		const hashedPassword = await bcrypt.hash(Password, 12);
		const newUser = await client.query(
			"INSERT INTO Tourist (FName, LName, UserName, Password, Email, Gender, PhoneNumber, BirthDate, Nationality, Language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[FName, LName, UserName, hashedPassword, Email, Gender, PhoneNum, BirthDate, Nationality, Language]
		);
		res.status(201).json({ message: "User created" });
	}),

	guideSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate, Language, Specialization } = req.body;
		const user = await client.query(
			"SELECT * FROM Tour_Guide WHERE UserName = $1 OR Email = $2",
			[UserName, Email]
		);
		if (user.rows.length)
			return res.status(400).json({ message: "User already exists" });
		const hashedPassword = await bcrypt.hash(Password, 12);
		const newUser = await client.query(
			"INSERT INTO Tour_Guide (FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate, Language, Specialization, Rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
			[FName, LName, UserName, Email, hashedPassword, Gender, PhoneNum, BirthDate, Language, Specialization, 0]
		);
		res.status(201).json({ message: "User created" });
	}),

	operatorSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate } = req.body;
		const user = await client.query(
			"SELECT * FROM Tour_Operator WHERE UserName = $1 OR Email = $2",
			[UserName, Email]
		);
		if (user.rows.length)
			return res.status(400).json({ message: "User already exists" });
		const hashedPassword = await bcrypt.hash(Password, 12);
		const newUser = await client.query(
			"INSERT INTO Tour_Operator(FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[FName, LName, UserName, Email, hashedPassword, Gender, PhoneNum, BirthDate]
		);
		res.status(201).json({ message: "User created" });
	}),

	touristLogin: catchAsync(async (req, res, next) => {
		const { UserName, Password } = req.body;
		const role = "tourist";
		const user = await client.query(
			"SELECT * FROM Tourist WHERE UserName = $1",
			[UserName]
		);
		if (!user.rows.length)
			return res.status(400).json({ message: "Invalid credentials" });
		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", data: user.rows });
	}),

	guideLogin: catchAsync(async (req, res, next) => {
		const { UserName, Password } = req.body;
		const role = "guide";
		const user = await client.query(
			"SELECT * FROM Tour_Guide WHERE UserName = $1",
			[UserName]
		);
		if (!user.rows.length)
			return res.status(400).json({ message: "Invalid credentials" });
		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", data: user });
	}),

	operatorLogin: catchAsync(async (req, res, next) => {
		const { UserName, Password } = req.body;
		const role = "operator";
		const user = await client.query(
			"SELECT * FROM Tour_Operator WHERE UserName = $1",
			[UserName]
		);
		if (!user.rows.length)
			return res.status(400).json({ message: "Invalid credentials" });
		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", data: user });
	}),

	updatePassword: catchAsync(async (req, res, next) => {}),

	logout: catchAsync(async (req, res, next) => {
		res.clearCookie("token");
		res.status(200).json({ message: "User logged out" });
	}),
};

const generateToken = (res, id, role) => {
	const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	// Save token in cookie
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
};

export default authController;
