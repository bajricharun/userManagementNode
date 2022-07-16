const supertest = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

require("../routes/user.route")(app);
require("../routes/permission.route")(app);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
const requestWithSupertest = supertest(app);

test("POST /api/permissions/assign-permissions/770", async () => {
    await requestWithSupertest
    .post("/api/permissions/assign-permissions/770")
    .send({
        permissionsId: [5, 6, 2]
    })
    .expect(200)
    .then((response) => {
        expect(response._body.payload.id).toEqual(770);
    })
})