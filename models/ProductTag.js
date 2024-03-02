const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');
// const {Product} = require('./index');

class ProductTag extends Model {}

ProductTag.init(
	{
		id:        {
			type:          DataTypes.INTEGER,   // Integer
			allowNull:     false,               // NOT NULL
			autoIncrement: true,                // AUTO_INCREMENT
			primaryKey:    true                 // PRIMARY KEY
		},
		product_id: {
			type:       DataTypes.INTEGER,  // Integer
			references: {
				model: 'product',
				key:   'id'
			}
		},
		tag_id:     {
			type: DataTypes.INTEGER,    // Integer
			references: {
				model: 'tag',
				key:   'id'
			}
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'product_tag'
	}
);

module.exports = ProductTag;
