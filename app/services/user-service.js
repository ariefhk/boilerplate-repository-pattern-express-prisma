const { userRepository } = require("../repositories");
const { ApplicationError } = require("../errors");
const { createToken, decodeToken } = require("../../utils/jwt");

const authorize = async (bearerToken) => {
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = decodeToken(token);
    const existingUser = await userRepository.findUser(tokenPayload.code);
    if (!existingUser) throw new ApplicationError(498, "invalid token");
    return existingUser;
};

const login = async (code) => {
    const existingUser = await userRepository.findUser(code);
    if (!existingUser) throw new ApplicationError(404, `user not found!`);

    const token = createToken({
        id: existingUser.id,
        name: existingUser.name,
        code: existingUser.code,
    });

    return {
        name: existingUser.name,
        token: token,
    };
};

const register = async (name, code) => {
    const existingUser = await userRepository.findUser(code);
    if (!!existingUser)
        throw new ApplicationError(
            409,
            `user with code ${code} already taken!`
        );

    const newUser = await userRepository.createUser(name, code);

    return {
        name: newUser.name,
        code: newUser.code,
    };
};

module.exports = {
    authorize,
    login,
    register,
};
