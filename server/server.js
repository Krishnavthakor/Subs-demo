const express = require("express");
const cors = require("cors");
const subscribe = require("./app/controllers/subscribe.controller.js");

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

app.post("/", subscribe.create);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
