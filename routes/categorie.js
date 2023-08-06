const express = require('express');
const router = express.Router();
const {CreateCategorieController, AllCategorieController, GetCategorieByIdController, UpdateCategorieController} = require("./controllers/CategorieController")


router.post("/create", (req, res, next) => {
    CreateCategorieController(req, res, next);
})

router.get("/all", function (req, res, next) {
    AllCategorieController(req, res, next)
})

router.get("/:id", function (req, res, next) {
    GetCategorieByIdController(req, res, next);
})

router.post("/update/:id", function (req, res, next) {
    UpdateCategorieController(req, res , next);
})

module.exports = router;
