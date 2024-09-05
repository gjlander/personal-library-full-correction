const express = require('express');
require('dotenv').config();
require('colors');

const app = express();
const cors = require('cors');
const connectDB = require('./dbinit.js');

const userRouter = require('./routes/userRoutes.js');
const bookRouter = require('./routes/bookRoutes.js');

connectDB();
// usual middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Welcome to the Personal Library API');
});

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.yellow);
});
