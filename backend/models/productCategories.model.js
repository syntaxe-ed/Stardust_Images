const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategoriesSchema = new Schema ({
	fileName: {
		type: String,
		required: true,
		unique: true,
		trim: false
	},
	title: {
        type: String,
        required: true,
        unique: true
    },
    reference: {
        type: String,
        required: true,
    }
})

const ProductCategories = mongoose.model('ProductCategories', productCategoriesSchema)
module.exports = ProductCategories