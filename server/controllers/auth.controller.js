import catchAsync from "../utils/catchAsync.js";
import client from '../dbConfig.js'
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


const authController = {
	touristSignup: catchAsync(async (req, res, next) => {
		const { firstName, lastName, username, email, password, gender, phonenumber, birthdate, selectedCountry, selectedLanguage } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await client.query(
			"INSERT INTO Tourist (FName, LName, UserName, Password, Email, Gender, PhoneNumber, BirthDate, Nationality, Language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[firstName, lastName, username, hashedPassword, email, gender, phonenumber, birthdate, selectedCountry, selectedLanguage]
		);

		res.status(201).json({ message: "User created" });
	}),

	guideSignup: catchAsync(async (req, res, next) => {
		const { firstName, lastName, username, email, password, gender, phonenumber, birthdate, selectedLanguage, specialliztion } = req.body;
		
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await client.query(
			"INSERT INTO Tour_Guide (FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate, Language, Specialization) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[firstName, lastName, username, email, hashedPassword, gender, phonenumber, birthdate, selectedLanguage, specialliztion]
		);

		res.status(201).json({ message: "User created" });
	}),

	operatorSignup: catchAsync(async (req, res, next) => {
		const { firstName, lastName, username, email, password, gender, phonenumber, birthdate } = req.body;

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await client.query(
			"INSERT INTO Tour_Operator (FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[firstName, lastName, username, email, hashedPassword, gender, phonenumber, birthdate]
		);

		res.status(201).json({ message: "User created" });
	}),

	touristLogin: catchAsync(async (req, res, next) => {
		const { username, password } = req.body;
		const role = "tourist";
		const user = await client.query(
			"SELECT * FROM Tourist WHERE UserName = $1",
			[username]
		);

		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}

		if(user.rows[0].banned == "1"){
			const err = new Error("You are permanently banned!");
			err.statusCode = 404;
			return next(err);
		}

		const isMatch = await bcrypt.compare(password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}
		generateToken(res, user.rows[0].id, role); // this adds token to cookie

		res.status(201).json({ message: "Logged In", body: user.rows });
	}),

	guideLogin: catchAsync(async (req, res, next) => {
		const { username, password } = req.body;
		const role = "guide";
		const user = await client.query(
			"SELECT * FROM Tour_Guide WHERE UserName = $1",
			[username]
		);

		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}

		const isMatch = await bcrypt.compare(password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}

		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", body: user });
	}),

	operatorLogin: catchAsync(async (req, res, next) => {
		const { username, password } = req.body;
		const role = "operator";
		const user = await client.query(
			"SELECT * FROM Tour_Operator WHERE UserName = $1",
			[username]
		);
		if (!user.rowCount){
			const err = new Error("Invalid credentials!");
			err.statusCode = 400;
			return next(err);
		}
		
		const isMatch = await bcrypt.compare(password, user.rows[0].password);
		if (!isMatch){
			const err = new Error("Invalid Credentials!");
			err.statusCode = 400;
			return next(err);
		}

		generateToken(res, user.rows[0].id, role); // this adds token to cookie
		res.status(201).json({ message: "Logged In", body: user });
	}),

	touristEditProfile: catchAsync(async (req, res, next) => {
		const { firstName, lastName, username, email, gender, birthdate, bio, phoneNo } = req.body;

		if(req.role != "tourist"){
			const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
		}
		
		const update = await client.query(
			"UPDATE Tourist SET FName = $1, LName = $2, UserName = $3, Email = $4, Gender = $5, PhoneNumber = $6, BirthDate = $7, Bio = $8 WHERE ID = $9 RETURNING *;",
			[firstName, lastName, username, email, gender, phoneNo, birthdate, bio, req.user.id]
		);

		res.status(201).json({ message: "User updated", data: update.rows });
	}),

	guideEditProfile: catchAsync(async (req, res, next) => {
		const { firstName, lastName, username, email, gender, phonenumber, birthdate, specialization } = req.body;

		if(req.role != "guide"){
			const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
		}
		
		const update = await client.query(
			"UPDATE Tour_Guide SET FName = $1, LName = $2, UserName = $3, Email = $4, Gender = $5, PhoneNumber = $6, BirthDate = $7, Specialization = $8 WHERE ID = $9 RETURNING *;",
			[firstName, lastName, username, email, gender, phonenumber, birthdate, specialization, req.user.id]
		);

		res.status(201).json({ message: "User updated", data: update.rows });
	}),

	operatorEditProfile: catchAsync(async (req, res, next)=>{
		const { firstName, lastName, username, email, gender, phonenumber, birthdate } = req.body;

		if(req.role != "operator"){
			const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
		}

		const update = await client.query(
			"UPDATE Tour_Operator SET FName = $1, LName = $2, UserName = $3, Email = $4, Gender = $5, PhoneNumber = $6, BirthDate = $7 WHERE ID = $8",
			[firstName, lastName, username, email, gender, phonenumber, birthdate, req.user.id]
		);

		res.status(201).json({ message: "User updated", data: update.rows });
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
		// httpOnly: true,
		// secure: true,  
		secure: process.env.NODE_ENV === "production"
	});

	return token;
};

export default authController;
