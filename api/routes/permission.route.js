module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require("body-parser").json();
    const permissionController = require("../controllers/permission.controller");

    router.post("/assign-permissions/:userId", bodyParser, permissionController.assignPermission);
    router.get("/:id", bodyParser, permissionController.viewPermissionsForUser);
    router.get("/", bodyParser, permissionController.viewPermissions);

    app.use("/api/permissions", router);
}