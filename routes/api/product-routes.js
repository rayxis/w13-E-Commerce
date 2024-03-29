const router                               = require('express').Router();
const {Product, Category, Tag, ProductTag} = require('../../models');

// The `/api/products` endpoint

// Route for getting all products
router.get('/', (req, res) => {
	// Fetch all products in JSON and include Category and Tag models.
	Product.findAll({
		                include: [
			                {model: Category},
			                {model: Tag}
		                ]
	                })
		// Send JSON data to user
	       .then(productList => res.status(200).json(productList))
	       .catch(err => res.status(400).json(err));
});

// Route for a specific product
router.get('/:id', (req, res) => {
	// Fetch an individual product in JSON and include Category and Tag models.
	Product.findOne({
		                where:   {id: req.params.id},
		                include: [
			                {model: Category},
			                {model: Tag}
		                ]
	                })
		// Send JSON data to user
	       .then(productItem => res.status(200).json(productItem))
	       .catch(err => res.status(400).json(err));
});

// Route to add a product
router.post('/', (req, res) => {
	/* req.body should look like this...
	 {
	 product_name: "Basketball",
	 price: 200.00,
	 stock: 3,
	 tagIds: [1, 2, 3, 4]
	 }
	 */
	Product.create(req.body)
	       .then((product) => {
		       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
		       if (req.body.tagIds.length) {
			       const productTagIdArr = req.body.tagIds.map((tag_id) => {
				       return {
					       product_id: product.id,
					       tag_id
				       };
			       });
			       return ProductTag.bulkCreate(productTagIdArr);
		       }
		       // if no product tags, just respond
		       res.status(200).json(product);
	       })
	       .then((productTagIds) => res.status(200).json(productTagIds))
	       .catch((err) => {
		       console.log(err);
		       res.status(400).json(err);
	       });
});

// update product
router.put('/:id', (req, res) => {
	// update product data
	Product.update(req.body, {where: {id: req.params.id}})
	       .then((product) => {
		       if (req.body.tagIds && req.body.tagIds.length) {

			       ProductTag.findAll({where: {product_id: req.params.id}})
			                 .then((productTags) => {
				                 // create filtered list of new tag_ids
				                 const productTagIds  = productTags.map(({tag_id}) => tag_id);
				                 const newProductTags = req.body.tagIds
				                                           .filter((tag_id) => !productTagIds.includes(tag_id))
				                                           .map((tag_id) => {
					                                           return {
						                                           product_id: req.params.id,
						                                           tag_id
					                                           };
				                                           });

				                 // figure out which ones to remove
				                 const productTagsToRemove = productTags
					                 .filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
					                 .map(({id}) => id);
				                 // run both actions
				                 return Promise.all([
					                                    ProductTag.destroy({where: {id: productTagsToRemove}}),
					                                    ProductTag.bulkCreate(newProductTags)
				                                    ]);
			                 });
		       }

		       return res.json(product);
	       })
	       .catch((err) => {
		       // console.log(err);
		       res.status(400).json(err);
	       });
});

// Route to delete a specific product
router.delete('/:id', (req, res) => {
	// Delete one product by its `id` value
	Product.destroy({where: {id: req.params.id}})
	       // Destroy the associated product tags
	       .then(product => ProductTag.destroy({where: {product_id: req.params.id}}))
		// Send JSON response data to user
	       .then(result => res.status(200).json(result))
	       .catch(err => res.status(400).json(err));
});

module.exports = router;
