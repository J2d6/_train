const express = require("express");
const { createNewWagonController, DeleteWagonController, GetWagonByIdController, GetAllWagonsController, GetDispoWagonsController } = require("./controllers/WagonController");
const router = express.Router();


router.post("/create/:id", (req, res, next) => {
    createNewWagonController(req, res, next);
})
router.delete("/delete/:id", (req, res, next) => {
    DeleteWagonController(req, res, next);
})

router.get("/", (req, res, next) => {
    GetWagonByIdController(req, res, next);
})

router.get("/all", (req, res, next) => {
    GetAllWagonsController(req, res, next);
})

router.get("/dispo", (req, res, next) => GetDispoWagonsController(req, res, next) )
module.exports = router ;

