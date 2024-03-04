const router                               = require('express').Router();
const {Tag, Product, ProductTag, Category} = require('../../models');

// The `/api/tags` endpoint

// Route for getting all tags
router.get('/', (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	Tag.findAll({include: [{model: Product}]})
		// Send JSON data to user
	   .then(tagList => res.status(200).json(tagList))
	   .catch(err => res.status(400).json(err));
});

// Route to get a specific tag
router.get('/:id', (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	Tag.findOne({
		            where:   {id: req.params.id},
		            include: [{model: Product}]
	            })
		// Send JSON data to user
	   .then(tagItem => res.status(200).json(tagItem))
	   .catch(err => res.status(400).json(err));
});

// Route to add a tag
router.post('/', async (req, res) => {
	// Create a new tag
	Tag.create({tag_name: req.body.tagName})
	   // Send the values back to the user in JSON format
	   .then(newTag => res.status(200).json(newTag))
	   .catch((err) => res.status(400).json(err));
});

// Route to update a specific tag
router.put('/:id', (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(req.body, {where: {id: req.params.id}})
	   .then((product) => {})
	   .catch((err) => res.status(400).json(err));
});

// Route to delete a specific tag
router.delete('/:id', (req, res) => {
	// Delete on tag by its `id` value
	Tag.destroy({where: {id: req.params.id}})
		// Send JSON data to user
	   .then(result => res.status(200).json(result))
	   .catch((err) => res.status(400).json(err));
});

module.exports = router;
