const express = require('express');

// import all the controllers
const {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteOneBook,
} = require('../controllers/bookControllers.js');

// create a new instance or express router
const bookRouter = express.Router();

// decide which controllers to execute on the specific actions
bookRouter.route('/').get(getAllBooks).post(createBook);

bookRouter.route('/:id').get(getOneBook).put(updateBook).delete(deleteOneBook);

module.exports = bookRouter;
