const jwt = require('jsonwebtoken');
const { JWT_SIGNATURE_KEY } = require('../config/application');

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SIGNATURE_KEY);
};

const decodeToken = (token) => {
    return jwt.decode(token, JWT_SIGNATURE_KEY);
};

module.exports = {
    createToken,
    decodeToken,
};
