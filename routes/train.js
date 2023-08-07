const express = require('express');
const router = express.Router();

const { CreateTrainController, getTrainByIdController } = require("./controllers/TrainConroller")


router.post("/create", (req, res, next) => {
    CreateTrainController(req, res, next);
})


router.get("/:id", (req, res, next) =>{
    getTrainByIdController(req, res, next);
})
module.exports = router;