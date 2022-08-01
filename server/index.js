const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./config/db');

const route = require('./routes');

// Connect to Database
db.connect();

const app = express();

// app.use(cors());
// app.use(morgan('server'));
// app.use(
//     express.urlencoded({
//         extended: true,
//     }),
// );

app.use(express.json());

route(app);

const PORT = 5001;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
