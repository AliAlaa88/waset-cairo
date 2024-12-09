import catchAsync from "../utils/catchAsync";

const authController = {
	// generate a token during signup???
	signup: catchAsync(async (req, res, next) => {
		const role = req.body.role;
		if (role === "tourist") {
			const { FName, LName, UserName, Email, Password } = req.body;
			const user = await client.query(
				"SELECT * FROM Tourist WHERE UserName = $1 OR Email = $2",
				[UserName, Email]
			);
			if (user.rows.length)
				return res.status(400).json({ message: "User already exists" });

			const hashedPassword = await bcrypt.hash(Password, 12);
			const newUser = await client.query(
				"INSERT INTO Tourist (FName, LName, UserName, Email, Password) VALUES ($1, $2, $3, $4, $5)",
				[FName, LName, UserName, Email, hashedPassword]
			);
			// generateToken(res, newUser.rows[0].id, role); // this adds token to cookie
			//res.status(201).json({ message: "User created", data: newUser });
			res.status(201).json({ message: "User created" });
		} else if (role === "guide") {
			const { FName, LName, UserName, Email, Password } = req.body;
			const user = await client.query(
				"SELECT * FROM Tour guide WHERE UserName = $1 OR Email = $2",
				[UserName, Email]
			);
			if (user.rows.length)
				return res.status(400).json({ message: "User already exists" });

			const hashedPassword = await bcrypt.hash(Password, 12);
			const newUser = await client.query(
				"INSERT INTO Tour guide (FName, LName, UserName, Email, Password) VALUES ($1, $2, $3, $4, $5)",
				[FName, LName, UserName, Email, hashedPassword]
			);
			// generateToken(res, newUser.rows[0].id, role); // this adds token to cookie
			//res.status(201).json({ message: "User created", data: newUser });
			res.status(201).json({ message: "User created" });
		} else if (role === "operator") {
			const { FName, LName, UserName, Email, Password } = req.body;
			const user = await client.query(
				"SELECT * FROM Tour Operator WHERE UserName = $1 OR Email = $2",
				[UserName, Email]
			);
			if (user.rows.length)
				return res.status(400).json({ message: "User already exists" });

			const hashedPassword = await bcrypt.hash(Password, 12);
			const newUser = await client.query(
				"INSERT INTO Operator (FName, LName, UserName, Email, Password) VALUES ($1, $2, $3, $4, $5)",
				[FName, LName, UserName, Email, hashedPassword]
			);
			// generateToken(res, newUser.rows[0].id, role); // this adds token to cookie
			//res.status(201).json({ message: "User created", data: newUser });
			res.status(201).json({ message: "User created" });
		}
	}),

	login: catchAsync(async (req, res, next) => {
		const role = req.body.role;
		if (role === "tourist") {
			const { UserName, Password } = req.body;
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
			res.status(201).json({ message: "Logged In", data: user });
		} else if (role === "guide") {
			const { UserName, Password } = req.body;
			const user = await client.query(
				"SELECT * FROM Tour guide WHERE UserName = $1",
				[UserName]
			);
			if (!user.rows.length)
				return res.status(400).json({ message: "Invalid credentials" });
			const isMatch = await bcrypt.compare(Password, user.rows[0].password);
			if (!isMatch)
				return res.status(400).json({ message: "Invalid credentials" });
			generateToken(res, user.rows[0].id, role); // this adds token to cookie
			res.status(201).json({ message: "Logged In", data: user });
		} else if (role === "operator") {
			const { UserName, Password } = req.body;
			const user = await client.query(
				"SELECT * FROM Tour Operator WHERE UserName = $1",
				[UserName]
			);
			if (!user.rows.length)
				return res.status(400).json({ message: "Invalid credentials" });
			const isMatch = await bcrypt.compare(Password, user.rows[0].password);
			if (!isMatch)
				return res.status(400).json({ message: "Invalid credentials" });
			generateToken(res, user.rows[0].id, role); // this adds token to cookie
			res.status(201).json({ message: "Logged In", data: user });
		}
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
