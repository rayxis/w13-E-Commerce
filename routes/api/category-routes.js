const router                   = require('express').Router();
const {Category, Product, Tag} = require('../../models');
const req                      = require('express/lib/request');
const res                      = require('express/lib/response');

// The `/api/categories` endpoint

// Route for getting all categories
router.get('/', (req, res) => {
	// List all categories and include Product model.
	Category.findAll({include: [{model: Product}]})
		// Send JSON data to user
		    .then(categoryList => res.status(200).json(categoryList))
		    .catch(err => res.status(400).json(err));
});

// Route for a specific category
router.get('/:id', (req, res) => {
	// Fetch an individual category in JSON and include Product model.
	Category.findOne({
		                 where:   {id: req.params.id},
		                 include: [{model: Product}]
	                 })
		// Send JSON data to user
		    .then(categoryItem => res.status(200).json(categoryItem))
		    .catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
	// create a new category
	Category.create(req.body)
	        .then(product => {
		        // TODO: Figure out what the input should look like
		        if (req.body.category.length) {
		        }
	        })
	        .then(newCategory => res.status(200).json(newCategory))
	        .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
	Category.update(req.body, {where: {id: req.params.id}})
	        .then((product) => {})
	        .catch((err) => res.status(400).json(err));
});

// Route to delete a specific category
router.delete('/:id', (req, res) => {
	// Delete a category by its `id` value
	Category.destroy({where: {id: req.params.id}})
		// Send JSON data to user
	        .then(result => res.status(200).json(result))
	        .catch((err) => res.status(400).json(err));
});

module.exports = router;
