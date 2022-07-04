const router = require('express').Router();
const products = require('../models/products.model');
const productCategories = require('../models/productCategories.model');

router.route('/pages').get((req, res) => {
	productCategories.find()
		.then((productCategories) => {
			res.json(productCategories)
		})
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/all').get((req, res) => {
	products.find()
		.then((products) => {
			const newProducts = products.map((product) => {
				return {
					folder: `products/${product.category.toLowerCase().replace(/ /g, '_')}/`,
					image: product.fileName,
					cost: product.price,
					id: product._id,
					name: product.productName,
					category: product.category
				}
			})
            res.json(newProducts)
        })
		.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
	products.find({category: req.params.id.toLowerCase().replace('_', ' ')})
		.then((products) => {
			const newProducts = products.map((product) => {
				return {
					folder: `products/${product.category.toLowerCase().replace(/ /g, '_')}/`,
					image: product.fileName,
					cost: product.price,
					id: product._id,
					name: product.productName,
					category: product.category
				}
			})
            res.json(newProducts)
        })
		.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').post((req, res) => {
	const product = new products({fileName: req.body.fileName, productName: req.body.productName, price: req.body.price, category: req.body.category})
	product.save((err) => {
		if (err) {
			res.json(`Page ${product.productName} could not be created, ${err}`)
		} else {
			res.json('Page created')
		}
	})
})

router.route('/:id/update').post((req, res) => {
	const query = {'_id': req.params.id}
	const newEntity = {'_id': req.params.id, fileName: req.body.fileName, productName: req.body.productName, price: req.body.price, category: req.body.category}
	products.findOneAndUpdate(query, newEntity, {upsert: true, async: true}, (err, dock) => {
		if (err) {
			console.log(err);
			return res.send(500, {error: err});
		}
		return res.send('Successfully saved.')
	})
})

module.exports = router;