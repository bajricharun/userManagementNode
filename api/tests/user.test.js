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

test("GET /api/user/10", async () => {
    await requestWithSupertest
        .get("/api/user/10")
        .expect(200)
        .then((response) => {
           expect(response._body.payload.length).toEqual(10);
           expect(response._body.payload[0].firstName).toEqual("Test0")
           expect(response._body.payload[0].lastName).toEqual("User0")
           expect(response._body.payload[0].username).toEqual("username0")
           expect(response._body.payload[0].password).toEqual("password")
           expect(response._body.payload[0].email).toEqual("0testemail@gmail.com")
           expect(response._body.payload[0].status).toEqual("employee")
        });
});

test("POST /api/user/add-user", async () => {
    await requestWithSupertest
    .post("/api/user/add-user")
    .send({
        firstName: "User",
        lastName: "Test",
        username: "test_user_jest",
        email: "jest@gmail.com",
        password: "pass", 
        passwordSecond: "pass", 
        status: "employee"
    })
    .expect(200)
    .then((response) => {
        expect(response._body.payload.user.firstName).toEqual('User');
        expect(response._body.payload.user.lastName).toEqual('Test');
        expect(response._body.payload.user.username).toEqual('test_user_jest');
        expect(response._body.payload.user.email).toEqual('jest@gmail.com');
        expect(response._body.payload.user.status).toEqual('employee');

    })
});

test("POST /api/user/edit-user/770", async () => {
    await requestWithSupertest
    .post("/api/user/edit-user/770")
    .send({
        firstName: "Harun",
        lastName: "Bajric",
        email: "harun@gmail.com", 
        status: "employee"
    })
    .expect(200)
    .then((response) => {
        expect(response._body.payload.firstName).toEqual("Harun")
        expect(response._body.payload.lastName).toEqual("Bajric")
        expect(response._body.payload.email).toEqual("harun@gmail.com")
        expect(response._body.payload.status).toEqual("employee")
    });
});

test("POST second /api/user/edit-user/770", async () => {
    await requestWithSupertest
    .post("/api/user/edit-user/770")
    .send({
        firstName: "Hab",
        lastName: "",
        email: "", 
        status: "employee"
    })
    .expect(200)
    .then((response) => {
        expect(response._body.payload.firstName).toEqual("Hab")
        expect(response._body.payload.lastName).toEqual("Bajric")
        expect(response._body.payload.email).toEqual("harun@gmail.com")
        expect(response._body.payload.status).toEqual("employee")
    });
});
