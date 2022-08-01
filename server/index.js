const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const db = require('./config/db');

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

app.use('/api/auth', authRouter);
const PORT = 5001;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
