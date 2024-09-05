const express = require('express');

// import all the controllers
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteOneUser,
    addBookToList,
    removeBookFromList,
    updateBookInList,
} = require('../controllers/userControllers.js');

// create a new instance or express router
const userRouter = express.Router();

// decide which controllers to execute on the specific actions
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getOneUser).put(updateUser).delete(deleteOneUser);

userRouter.route('/:id/books').post(addBookToList);

userRouter
    .route('/:id/books/:bookId')
    .put(updateBookInList)
    .delete(removeBookFromList);

module.exports = userRouter;
