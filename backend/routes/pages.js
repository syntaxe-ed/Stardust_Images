const router = require('express').Router();
let galleryPages = require('../models/pages.model');

router.route('/').get((req, res) => {
	galleryPages.find()
		.then((galleryPages) => {
            console.log(galleryPages);
            res.json(galleryPages)
        })
		.catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;