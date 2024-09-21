import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import Unit from "../models/Unit.js";
import { attachCookies, createJWT } from "../utils/index.js";

const login = async (req, res) => {
	// if any fields missing from user front end, throw error
	if (!req.body.email || !req.body.password) {
		throw new BadRequestError("please provide email and password");
	}

	// check UserHome model in database for entered email
	// select('+password') needed since password property in UserHome is hidden
	const querieduser = await User.findOne({ email: req.body.email }).select("+password");
	if (!querieduser) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	// verify entered password using function we created in UserHome.js
	// to compare with this.password
	const passwordVerified = await querieduser.comparePassword(req.body.password);
	if (!passwordVerified) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	// user variable with just the fields we want to send to attach (will also be saved in front end state)
	const user = {
		id: querieduser._id, // unique user id
		account: querieduser.account, // unique id for all management and all tenants
		isAdmin: querieduser.isAdmin,
		role: querieduser.role,
		email: querieduser.email,
		firstName: querieduser.firstName,
		lastName: querieduser.lastName,
	};

	// create jwt with jwt.sign
	const token = createJWT({ payload: user });

	// create cookie in the response, where we attach token
	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({
		message: "user logged in success",
		data: {
			account: user.account,
			user: {
				id: user.id,
				lastName: user.lastName,
				firstName: user.firstName,
				email: user.email,
				phone: user.phone,
			},
			role: user.role
		},
	});
}

const logout = async (req, res) => {
	// change token name to anything, then expire it
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now())
	});

	res.status(StatusCodes.OK).json({ message: "user logged out" });
}

const getUserList = async (req, res) => {
	const users = await User.find({ isAdmin: false }).sort({ lastName: -1})
	// format to display front end
	const userList = users.map(user => {
		return {
			label: `${user.lastName}, ${user.firstName}`,
			value: user.id
		}

	})
	res.status(StatusCodes.OK).json({ userList })
}

const getAdminInfo = async (req, res) => {
	const admin = await User.findOne({ isAdmin: true })
	const adminInfo = [{
		label: "Admin",
		value: admin.id
	}]
	res.status(StatusCodes.OK).json({ adminInfo })
}

const updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.body._id, req.body)
	if (!user) {
		throw new NotFoundError(`No user with id :${req.body._id}`);
	}
	res.status(StatusCodes.OK).json({ msg: 'Update success' })
}

export { login, logout, getUserList, getAdminInfo, updateUser }