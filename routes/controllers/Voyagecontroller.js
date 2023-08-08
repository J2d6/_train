const { PrismaClient } =  require('@prisma/client');
const { makeDate, makeHour, makePrettierVoyage } = require('./util/VoyageUtils');
const prisma = new PrismaClient()


/**
 * Create a voyage
 * 
 * @param {number} numTrain - train's id  
 * @param {String} dprt - Deaprture location (Fianarantsoa or Manakara) 
 * @param {String} arr - Arrival  location (Fianarantsoa or Manakara) 
 * @param {Date} date - Date de départ (format : new Date(aaaa, mm, jjj, 0,0,0))
 * @param {Date} hr - Heure de départ ( format new Date(0,0,0,h,m,s)) 
 * @throws {Error} if error occured
*/
const CreateVoyage = async function (numTrain, dprt, arr, date,  hr) {
    try {
        const voyage = await prisma.voyage.create({
            data : {
                numTrain : +numTrain,
                depart : dprt , // lieu
                destination : arr,
                heureDepart : hr,
                dateVoyage : date
            }
        });
        const idVoyage = voyage.idVoyage;
        const newlyVoyage = await prisma.voyage.findUnique({
            where : {
                idVoyage : +idVoyage
            }, include : {
                train : {
                    include : {
                        wagons: true
                    }
                }
            }
        });
        return newlyVoyage;
    } catch (error) {
        throw new Error(error.message)
    }
}
exports.CreateVoyage = CreateVoyage ; 

const CreateVoyageController = async function (req, res, next) {
    const response = {}
    try {
        const newVoyage = await CreateVoyage(req.body.numTrain,
                                             req.body.depart,
                                             req.body.destination,
                                             makeDate(req.body.dateVoyage), // doit etre au format AAAA/MM/JJ
                                             makeHour(req.body.heureDepart) // "HH:mm:ss"
                                             );
        response.data = makePrettierVoyage(newVoyage);
        response.data.train = newVoyage.train;
        res.status(200).json(response)
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.CreateVoyageController = CreateVoyageController; 

/**
 * Get all voyage for a given date
 * @param {string} dateString 
 * @returns {[import('@prisma/client').Voyage]} array of Voyage 
 */
const getVoyagePerDate = async function (dateString) {
    const date = makeDate(dateString);
    console.log(dateString);
    try {
        const voyages = await prisma.voyage.findMany({
            where : {
                dateVoyage: date
            }, include : {
                train : {
                    include : {
                        wagons : true
                    }
                }
            }
        });
        for (let index = 0; index < voyages.length; index++) {
            const v = voyages[index];
            voyages[index] =  makePrettierVoyage(v);
            voyages[index].train = v.train; 
            
        }
        return voyages;
    } catch (error) {
        throw new Error(error.message)
    }
}
exports.getVoyagePerDate = getVoyagePerDate;

const getVoyagePerDateController = async function (req, res, next) {
    const response  = {}
    try {
        const voyages = await getVoyagePerDate(req.query.date);
        response.data = voyages;
        res.status(200).json(response); 
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response)
    }
}
exports.getVoyagePerDateController = getVoyagePerDateController; 


