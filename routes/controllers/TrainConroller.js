const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()

/**
 * Create a new Train . Attach some wagons to the newly created train. Wagons must be already exist
 * @param {number} nbWagon - number of wagons to attach to the train 
 * @param {[number]} wagons - array of idWagon to attach 
 * @throws {Error} if error has occured
 * @returns {import('@prisma/client').Train} - newly created Train
*/
const createTrain = async function (nbWagon, wagons) {
    try {
        const newTrain = await prisma.train.create({
            data : {
                nbWagon : +nbWagon
            }
        });

        const id = newTrain.numTrain;
        for (let index = 0; index < wagons.length; index++) {
            const wagon = await UpdateWagonsIdTrain(wagons[index],id);            
        }
        return newTrain
    } catch (error) {
        throw new Error(error.message)
    }
}



/**
 * Create a new Train
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const CreateTrainController = async function (req, res, next) {
    const response  = {};
    try {
        const newTrain = await createTrain(req.body.nbWagon, req.body.wagons);
        newTrain.wagons = req.body.wagons
        response.data = newTrain;
        res.status(201).json(response)
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}

exports.CreateTrainController = CreateTrainController;

/**
 * Attache un wagon à un train , update wagon's numTrain to the given numTrain
 * @param {number} idWagon - idWagon
 * @param {number} idTrain -idTrain
 * @throws {Error} if error occured
 */
const UpdateWagonsIdTrain = async function (idWagon, idTrain) {
    try {
        const wagon = await prisma.wagon.update({
            where : {
                idWagon : +idWagon
            },
            data : {
                numTrain : +idTrain
            }
        });
        return wagon;
    } catch (error) {
        throw new Error(error.message);
    }
}
exports.UpdateWagonsIdTrain = UpdateWagonsIdTrain;



/**
 * 
 * @param {number} numTrain 
 * @returns {boolean} false if train not found
 * @returns {import('@prisma/client').Train} 
 * @throws {Error} if error has occured
 */
const getTrainById = async function (numTrain) {
    try {
        const train = await prisma.train.findUnique({
            where : {
                numTrain : +numTrain
            }, 
            include : {
                wagons : true
            }
        });

        if (train) {
            return train
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTrainByIdController = async function (req, res, next) {
    const response = {};
    try {
        const train = await getTrainById(req.params.id);
        if (train) {
            response.data = train;
            res.status(200).json(response);
        } else {
            response.error = "train not found";
            res.status(404).json(response);
        }
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.getTrainByIdController = getTrainByIdController;