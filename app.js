const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/api", router);

app.listen(3333);