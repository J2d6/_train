const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()

/**
 * @throws {Error} - if server side error occured
 * @returns {import('@prisma/client').Categorie} - array in data section or an error in error section
 */
const AllCategorieController = async function (req, res, next) {
    const response = {}
    try {
        const allCategorie = await prisma.categorie.findMany();
        response.data = allCategorie;
        res.status(200).json(response)
    } catch (error) {
        response.error = roor.message;
        res.status(500).json(response);
    }
}
exports.AllCategorieController = AllCategorieController;


const testIfCategorieNameExist = async function (nomCategorie) {
    try {
        if (nomCategorie) {
            const categorie = await prisma.categorie.findUnique({
                where : {
                    nomCategorie : nomCategorie
                }
            })

            if (categorie) {
                return true
            } else {
                return false
            }
        } else {
            throw new Error("nomCategorieMust be not empty");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const CreateCategorie = async function (nomCategorie, prixCategorie, nbPlace) {
    try {
        if (nomCategorie && prixCategorie && nbPlace) {
            const testNameFlag = await testIfCategorieNameExist(nomCategorie)
            if (!testNameFlag) {
                // create
                const newCategorie = await prisma.categorie.create({
                    data : {
                        nomCategorie : nomCategorie,
                        prixCategorie : +prixCategorie,
                        nbPlace : +nbPlace
                    }
                })

                const response = {
                    data : newCategorie
                }
                return response;
            } else {
                throw new Error("nomCategorie already exists") // resolves in 400
            }
        } else {
            throw new Error("parameters cannot be empty!")
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const CreateCategorieController = async function (req, res, next) {
    const response = {} ;
    try {
        const newCategorie = await CreateCategorie(req.body.nomCategorie, req.body.prixCategorie, req.body.nbPlace);
        response.data = newCategorie;
        res.status(201).json(response)
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}

const GetCategorieById = async function (idCategorie) {
    try {
        const categorie = await prisma.categorie.findUnique({
            where : {
                idCategorie : +idCategorie
            }
        })
        if (categorie) {
            return categorie
        } else {
            throw new Error("Categorie not found")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const GetCategorieByIdController = async function (req, res, next) {
    const response = {};
    try {
        const categorie = await GetCategorieById(req.params.id)
        response.data = categorie;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const UpdateCategorieController = async function (req, res, next) {
    const response = {};
    try {
        const UpdatedCategorie = await UpdateCategorie(req.params.id, req.body)
        response.data = UpdatedCategorie;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.UpdateCategorieController = UpdateCategorieController
/**
 * 
 * @param {import('@prisma/client').Categorie} param0 
 * @throws {Error} if error has occured 
 */
const UpdateCategorie = async function (idCategorieGiven, {  
                            nomCategorie,
                            nbPlace ,
                            prixCategorie}) {
                                try {
                                    const updatedCategorie = await prisma.categorie.update({
                                        where : {
                                            idCategorie : +idCategorieGiven
                                        },
                                        data : {
                                            nomCategorie : nomCategorie,
                                            nbPlace : nbPlace ,
                                            prixCategorie : prixCategorie,
                                        }
                                    });
                                    
                                    return updatedCategorie
                                } catch (error) {
                                    throw new Error(error.message)
                                } finally {
                                    await prisma.$disconnect();
                                }
    
}




exports.GetCategorieByIdController = GetCategorieByIdController
exports.CreateCategorieController = CreateCategorieController;
exports.CreateCategorie = CreateCategorie;
exports.testIfCategorieNameExist = testIfCategorieNameExist;