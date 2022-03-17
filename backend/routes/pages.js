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

router.route('/').post((req, res) => {
	const page = new galleryPages({title: req.body.title, parentPage: req.body.parentPage, fileName: req.body.fileName})
	page.save((err) => {
		if (err) {
			res.json(`Page ${page.title} could not be created, ${err}`)
		} else {
			res.json('Page created')
		}
	})
})

router.route('/:id/update').post((req, res) => {
	const query = {'_id': req.params.id}
	const newEntity = {'_id': req.params.id, title: req.body.title, parentPage: req.body.parentPage, fileName: req.body.fileName}
	galleryPages.findOneAndUpdate(query, newEntity, {upsert: true}, (err, dock) => {
		if (err) {
			console.log(err);
			return res.send(500, {error: err});
		}
		return res.send('Successfully saved.')
	})
})

module.exports = router;