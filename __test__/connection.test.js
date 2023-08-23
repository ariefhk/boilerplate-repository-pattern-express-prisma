const { prismaClient } = require("../config/connection");

describe("it should be connect", () => {
    it("should be able to connect", async () => {
        await prismaClient.$connect();

        await prismaClient.$disconnect();
    });
});
