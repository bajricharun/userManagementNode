module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require("body-parser").json();
    const userController = require("../controllers/user.controller");

    router.get("/", bodyParser, userController.viewUsers);
    router.post("/add-user", bodyParser, userController.addNewUser);
    router.post("/edit-user/:id", bodyParser, userController.editUser);
    router.post("/delete-user/:id", bodyParser, userController.delete);
    router.get("/filter-users/:searchBy/:searchTerm", bodyParser, userController.searchBy);

    app.use("/api/user", router);
}