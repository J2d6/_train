const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GetAllWagons = async function () {
    try {
        const allWagons = await prisma.wagon.findMany();
        console.log(allWagons);
    } catch (error) {
        console.log(console.error());
    } finally {
        await prisma.$disconnect()
    }
  }


  async function (contact) {
    try {
        const client = await prisma.client.findUnique({
            where : {
                contactClient : contact
            }
        })

        if (client) {
            console.log(client);
            return;
        } 
        console.log("incorrect password");
    } catch (error) {
        throw new Error(error.message);
    }
}


GetAllWagons()
