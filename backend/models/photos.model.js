const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosSchema = new Schema ({
	fileName: {
		type: String,
		required: true,
		unique: true,
		trim: false
	},
	keywords: {
		type: String
	},
	galleryTitle: {
		type: String,
		required: true,
		trim: true
	},
	reference: {
		type: String
	}
})

const Photos = mongoose.model('Photos', photosSchema)
module.exports = Photos