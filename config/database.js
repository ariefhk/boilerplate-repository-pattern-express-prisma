const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient({
    errorFormat: "pretty",
    log: ["info", "query", "warn"],
});

module.exports = {
    prismaClient,
};
