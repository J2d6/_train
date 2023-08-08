const { CreateVoyageController, getVoyagePerDateController } = require('./controllers/Voyagecontroller')

const express = require('express');
const router = express.Router();


router.post("/create", (req, res, next) => {
    CreateVoyageController(req, res, next);
})
router.get("/per_date", (req, res, next) => {
    getVoyagePerDateController(req, res, next)
} )

module.exports = router;