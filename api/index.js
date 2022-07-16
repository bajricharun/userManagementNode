const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

require("./routes/user.route")(app);
require("./routes/permission.route")(app);

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);



app.listen(port, function () {
    console.log(`SERVER IS ON: ${port}`);
});
