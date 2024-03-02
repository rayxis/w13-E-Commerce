// import important parts of sequelize library
const {Model, DataTypes} = require('sequelize');
// import our database connection from config.js
const sequelize          = require('../config/connection');
// const {Category} = require('./index');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
	{
		id:          {
			type:          DataTypes.INTEGER,   // Integer
			allowNull:     false,               // NOT NULL
			autoIncrement: true,                // AUTO_INCREMENT
			primaryKey:    true                 // PRIMARY KEY
		},
		product_name: {
			type:      DataTypes.STRING,    // String
			allowNull: false,               // NOT NULL
		},
		price:       {
			type:      DataTypes.DECIMAL,   // Decimal
			allowNull: false,               // NOT NULL
			validate: {
				// Make sure the value is a decimal.
				isDecimal: true
			}
		},
		stock:       {
			type:         DataTypes.INTEGER,    // Integer
			allowNull:    false,                // NOT NULL
			defaultValue: 10,                   // Default: 10
			validate: {
				// Make sure the value is numeric.
				isNumeric: true
			}
		},
		category_id:  {
			type:         DataTypes.INTEGER,    // Integer
			references: {
				model: 'category',
				key:   'id'
			}
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'product'
	}
);

module.exports = Product;
