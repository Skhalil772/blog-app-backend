const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
	const token = req.signedCookies.refreshToken;
	console.log(req.cookies.refreshTokenJWT);

	if (!token) {
		throw new CustomError.UnauthenticatedError(" No Authentication Invalid");
	}

	try {
		const { user } = isTokenValid({ token });

		const { name, userId, role } = user;

		req.user = { name, userId, role };
		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError("Authentication Invalid");
	}
};

const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new CustomError.UnauthorizedError(
				"Unauthorized to access this route"
			);
		}
		next();
	};
};

module.exports = {
	authenticateUser,
	authorizePermissions,
};
