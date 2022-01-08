const router = require('express').Router();
const photosModel = require ('../models/photos.model');

router.route('/:id').get((req, res) => {
	photosModel.find({galleryTitle: req.params.id})
		.then(photos => res.json(photos))
		.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').get((req, res) => {
	photosModel.find()
		.then(photos => res.json(photos))
		.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').post((req, res) => {
	const photo = new photosModel({fileName: req.body.fileName, keywords: req.body.keywords, galleryTitle: req.body.galleryTitle, reference: req.body.reference})
	photo.save((err) => {
		if (err) {
			res.json(`Photo ${photo.fileName} could not be created, ${err}`)
		} else {
			res.json('Photo inserted into database')
		}
	})
})

module.exports = router;