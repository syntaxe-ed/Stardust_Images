const router = require('express').Router();
let galleryPages = require('../models/pages.model');

router.route('/:id').get((req, res) => {
	galleryPages.find({parentPage: req.params.id})
		.then((galleryPages) => {
            res.json(galleryPages)
        })
		.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').get((req, res) => {
	galleryPages.find()
		.then((galleryPages) => {
            res.json(galleryPages)
        })
		.catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;