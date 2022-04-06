const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
	fileName: {
		type: String,
		required: true,
		unique: true,
		trim: false
	},
	productName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
})

const Products = mongoose.model('Products', productsSchema)
module.exports = Products