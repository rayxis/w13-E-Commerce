const router                   = require('express').Router();
const {Category, Product, Tag} = require('../../models');
const req                      = require('express/lib/request');
const res                      = require('express/lib/response');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
	// find all categories
	// be sure to include its associated Products
	Category.findAll()
	        .then()
		// TODO: be more consistent with the variable name; also include the Products data
		    .then(category => res.status(200).json(category))
		    .catch(err => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({where: {id: req.params.id}})
	        .then()
		// TODO: be more consistent with the variable name; also include the Products data
		    .then(category => res.status(200).json(category))
		    .catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
	// create a new category
	Category.create(req.body)
	        .then()
	        .then()
		// res.status(200).json(newCategory);
		    .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
	Category.update(req.body, {where: {id: req.params.id}})
	        .then((product) => {})
	        .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
	// delete a category by its `id` value
	Category.destroy({where: {id: req.params.id}})
	        .then()
	        .then()
	        .catch((err) => res.status(400).json(err));
});

module.exports = router;
