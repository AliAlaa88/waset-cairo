import catchAsync from "../utils/catchAsync";

const authController = {
	signup: catchAsync(async (req, res, next) => {}),

	login: catchAsync(async (req, res, next) => {}),

	updatePassword: catchAsync(async (req, res, next) => {}),

	logout: catchAsync(async (req, res, next) => {}),
};

export default authController;
