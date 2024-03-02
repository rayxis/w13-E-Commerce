const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
	{
		id:      {
			type:          DataTypes.INTEGER,   // Integer
			allowNull:     false,               // NOT NULL
			autoIncrement: true,                // AUTO_INCREMENT
			primaryKey:    true                 // PRIMARY KEY
		},
		tag_name: {
			type: DataTypes.STRING  //  String
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'tag'
	}
);

module.exports = Tag;
