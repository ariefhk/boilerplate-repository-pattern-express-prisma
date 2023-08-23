const { prismaClient } = require("../../config/database");
const { v4: uuidv4 } = require("uuid");

const createUser = (name, code) => {
    return prismaClient.user.create({
        data: {
            id: uuidv4(),
            name,
            code,
        },
    });
};

const findUser = (code) => {
    return prismaClient.user.findUnique({
        where: {
            code,
        },
    });
};

module.exports = {
    createUser,
    findUser,
};
