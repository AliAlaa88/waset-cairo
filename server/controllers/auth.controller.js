import catchAsync from "../utils/catchAsync.js";
import client from '../dbConfig.js'
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


const authController = {
	touristSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate, Nationality, Language } = req.body;
		
		const hashedPassword = await bcrypt.hash(Password, 12);
		const newUser = await client.query(
			"INSERT INTO Tourist (FName, LName, UserName, Password, Email, Gender, PhoneNumber, BirthDate, Nationality, Language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[FName, LName, UserName, hashedPassword, Email, Gender, PhoneNum, BirthDate, Nationality, Language]
		);

		res.status(201).json({ message: "User created" });
	}),

	guideSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate, Language, Specialization } = req.body;
		
		const hashedPassword = await bcrypt.hash(Password, 12);
		const newUser = await client.query(
			"INSERT INTO Tour_Guide (FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate, Language, Specialization) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[FName, LName, UserName, Email, hashedPassword, Gender, PhoneNum, BirthDate, Language, Specialization]
		);

		res.status(201).json({ message: "User created" });
	}),

	operatorSignup: catchAsync(async (req, res, next) => {
		const { FName, LName, UserName, Email, Password, Gender, PhoneNum, BirthDate } = req.body;

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

		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}

		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}

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

		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}

		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}

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
		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}
		
		const isMatch = await bcrypt.compare(Password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}

		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", data: user });
	}),

	updatePassword: catchAsync(async (req, res, next) => {
		const {currPassword, newPassword} = req.body;
		const user_role = req.role === "operator"? "Tour_Operator" : req.role === "guide"? "Tour_Guide" : "Tourist";

		const currUserPass = await client.query(
			`SELECT PASSWORD FROM ${user_role} WHERE ID = $1;`,
			[req.user.id]
		);

		const isMatch = await bcrypt.compare(currPassword, currUserPass.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}
		
		const hashedPassword = await bcrypt.hash(newPassword, 12);
		const update = await client.query(
			`UPDATE ${user_role} SET PASSWORD = $1;`,
			[hashedPassword]
		);
		res.status(201).json({ msg: "Updated Password Successfully!" });
	}),

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
