const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        /**
         * Extracts the token from the 'Authorization' header in the request.
         *
         * @param {Object} req - The request object.
         * @param {Object} req.headers - The headers of the request.
         * @param {string} req.headers.authorization - The 'Authorization' header containing the token.
         * @returns {string} The extracted token.
         * @throws {TypeError} If the 'Authorization' header is not present or improperly formatted.
         */
        if (req.originalUrl != "/api/v1/auth/current-user" && !req.headers['authorization']) return next();
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Auth Failed",
                });
            }
            else {
                req.body.userId = decode.userId;
                next();
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: "Auth failed"
        });
    }
}