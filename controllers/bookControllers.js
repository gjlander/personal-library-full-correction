const Book = require('../models/Book.js');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        if (!books.length) {
            return res.status(404).json({ msg: 'No books found' });
        }
        return res.status(200).json({ msg: 'Here are the books', books });
    } catch (error) {
        console.error(error);

        res.status(500).json(error);
    }
};

// get one book
const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ msg: 'No book found' });
        }
        return res.status(200).json({ msg: 'Here is the book', book });
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, categories } = req.body;
        const newBook = await Book.create({ title, author, isbn, categories });
        if (!newBook) {
            return res.status(400).json({ msg: 'Book failed to be created' });
        }
        return res
            .status(201)
            .json({ msg: 'Book created successfully', newBook });
    } catch (error) {
        res.status(500).json(error);
    }
};

// update a book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, categories } = req.body;
        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, isbn, categories },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ msg: 'No book found' });
        }
        return res.status(200).json({ msg: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete a book
const deleteOneBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ msg: "I don't know this book :(" });
        } else {
            return res.status(200).json({
                msg: 'Book deleted successfully',
                book,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteOneBook,
};
