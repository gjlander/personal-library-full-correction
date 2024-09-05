const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, 'min length 2 characters'],
        maxLength: 100,
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, 'min length 2 characters'],
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email',
        ],
        unique: true,
    },
    readingList: {
        type: [
            {
                refBook: {
                    type: Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                    enum: ['read', 'in progress', 'pending', 'unread'],
                    default: 'pending',
                },
            },
        ],
        default: () => [],
    },
});

module.exports = mongoose.model('User', UserSchema);
