const User = require('../models/user.js');
//have to import book model if we want to update collection
const Book = require('../models/Book.js');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('readingList.refBook');

        if (!users.length) {
            return res.status(404).json({ msg: 'No users found' });
        }
        return res.status(200).json({ msg: 'Here are the users', users });
    } catch (error) {
        console.error(error);

        res.status(500).json(error);
    }
};

// get one user
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('readingList.refBook');

        if (!user) {
            return res.status(404).json({ msg: 'No user found' });
        }
        return res.status(200).json({ msg: 'Here is the user', user });
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a new user
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const newUser = await User.create({ firstName, lastName, email });
        if (!newUser) {
            return res.status(400).json({ msg: 'User failed to be created' });
        }
        return res
            .status(201)
            .json({ msg: 'User created successfully', newUser });
    } catch (error) {
        res.status(500).json(error);
    }
};

// update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, email },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ msg: 'No user found' });
        }
        return res.status(200).json({ msg: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete a user
const deleteOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            return res.status(200).json({
                msg: 'User deleted successfully',
                user,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
//assumes book exists in collection (i.e, user can choose from list of books in collection to add to reading list)
const addBookToList = async (req, res) => {
    try {
        const { id } = req.params;
        const { refBook } = req.body;

        //book content
        //logic for adding a new book
        //get a reference to the book Id

        const newBook = { refBook };

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "I don't know this user :(" });
        }

        user.readingList.push(newBook);
        await user.save();

        return res.json({ msg: 'Book added successfully', user });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeBookFromList = async (req, res) => {
    try {
        const { id, bookId } = req.params;

        const user = await User.findById(id);

        user.readingList.id(bookId).deleteOne();
        await user.save();

        if (!user) {
            return res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            return res.status(200).json({
                msg: 'Book removed successfully',
                user,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateBookInList = async (req, res) => {
    try {
        const { id, bookId } = req.params;
        const { status } = req.body;

        const user = await User.findById(id);

        const book = user.readingList.id(bookId);

        book.status = status;
        await user.save();

        if (!user) {
            return res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            return res.status(200).json({
                msg: 'Book removed successfully',
                user,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteOneUser,
    addBookToList,
    removeBookFromList,
    updateBookInList,
};
