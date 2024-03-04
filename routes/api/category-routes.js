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

// Route to add a category
router.post('/', (req, res) => {
	// Create a new category
	Category.create({category_name: req.body.categoryName})
		// Send the values back to the user in JSON format
		    .then(newCategory => res.status(200).json(newCategory))
		    .catch(err => res.status(400).json(err));
});

// Route to update a specific category
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
