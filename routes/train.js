const express = require('express');
const router = express.Router();

const { CreateTrainController, getTrainByIdController, GetAllTrainController } = require("./controllers/TrainConroller")


router.post("/create", (req, res, next) => {
    CreateTrainController(req, res, next);
})


router.get("/get/unique/:id", (req, res, next) =>{
    getTrainByIdController(req, res, next);
})


router.get("/get/all", (req, res, next) => {
    GetAllTrainController(req, res, next);
} )



module.exports = router;