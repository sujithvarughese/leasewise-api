import { validateJWT } from "../utils/index.js";
import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js';


// all protected routes will be authorized
const authenticateUser = async (req, res, next) => {
	// note: regular unsigned cookies would be in req.cookies.token
	const token = req.signedCookies.token
	// if token not found, there is no user logged in
	if (!token) {
		throw new UnauthenticatedError('No signed token found');
	}
	try {
		// validate token
		const payload = validateJWT({ token })
		// make user obh on req obj to always know userID and isAdmin
		req.user = { userID: payload.id, isAdmin: payload.isAdmin, role: payload.role, account: payload.account }
		/*
		if (payload.isSystemAdmin) {
			req.user.isSystemAdmin = payload.isSystemAdmin
		}
		 */
		next()
	} catch (error) {
		throw new UnauthenticatedError('token not verified')
	}
};

// authorize if user isAdmin
const authorizePermissions = (req, res, next) => {
	if (req.user.role !== "management" || !req.user.isAdmin) {
		throw new UnauthorizedError('Role not authorized')
	}
	next()
}

const authorizeSystemAdmin = (req, res, next) => {
	if (!req.user.isSystemAdmin) {
		throw new UnauthorizedError('Role not authorized')
	}
	next()
}

export { authenticateUser, authorizePermissions, authorizeSystemAdmin };
