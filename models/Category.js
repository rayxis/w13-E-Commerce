const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
	{
		id:           {
			type:          DataTypes.INTEGER,   // Integer
			allowNull:     false,               // NOT NULL
			autoIncrement: true,                // AUTO_INCREMENT
			primaryKey:    true                 // PRIMARY KEY
		},
		category_name: {
			type:        DataTypes.STRING,  // String
			allowNull:   false,             // NOT NULL
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'category'
	}
);

module.exports = Category;
