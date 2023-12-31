// // REFERENSI :
// //https://www.stackfive.io/work/prisma/seeding-relational-data-with-prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// import your seeder data here
const { users } = require('../prisma/seeder');

const seederFunc = async () => {
    //register your func here
    await Promise.all(
        // add data with your seeder
        users.map(async (userSeed) => {
            await prisma.user.create({
                data: {
                    ...userSeed,
                },
            });
        }),
    );
};

seederFunc()
    .catch((e) => {
        console.error(`There was an error while seeding: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Successfully seeded database. Closing connection.');
        await prisma.$disconnect();
    });
