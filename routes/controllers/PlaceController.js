const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

/**
 * Create a seat (place) within a given wagon 
 * @param {number} idPlace - idPlace
 * @param {number} idWagon - wagon's id within place must be created
 * @throws {Error} if error occured 
 * @returns {import("@prisma/client").Place} 
 * 
 * 
 */
const CreatePlace = async function (idPlace, idWagon) {
    try {
        const place = await prisma.place.create({
            data : {
                idPlace : idPlace,
                idWagon : idWagon
            }
        });

        return place;
    } catch (error) {
        throw new Error(error.message)
    }
}
exports.CreatePlace = CreatePlace;
/**
 * Create nbPlace seates within a given wagon
 * @param {number} nbPlace - number of aces to create
 * @param {number} idWagon - wagon's id within places should be created
 * @throws {Error}  if error has occured  
 * @returns {boolean} true if succeded
 */
const CreatePlaces = async (nbPlace, idWagon) => {
    try {
        for (let i = 1; i <= nbPlace; i++) {
            const place = await CreatePlace(i,idWagon)
        }
        return true;
    } catch (error) {
        throw new Error(error.message)
    }
}
exports.CreatePlaces = CreatePlaces;