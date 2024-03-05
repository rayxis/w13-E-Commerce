# E-commerce

## Description

This is a backend for an e-commerce website. The purpose of this project is to create a backend that connects the 
user to a database utilizing APIs.

## Installation

This system is built on Node.js environment and uses MySQL for database and Sequelize as our ORM. Before starting, 
make sure that Node.js and MySQL are installed on your machine.

In the directory where this is located, type the following command:

```shell
npm install
```

## Usage

### Requests

For the requests listed, the format is `https://[ server_address ]:[ port ]/api/[ api_call ]/[ id ]`, where the 
server address and ports are where you're hosting your server; `api_call` is the API you want to call; and optional 
`id` to reference a specified item for the request.

#### GET

- `/api/categories` - Request a detailed JSON list of all the categories
- `/api/products` - Request a detailed JSON list of all the products
- `/api/tags` - Request a detailed JSON list of all the tags
- `/api/categories/[id]` - Request detailed JSON information for a specific category
- `/api/products/[id]` - Request detailed JSON information for a specific product
- `/api/tags/[id]` - Request detailed JSON information for a specific tag

#### DELETE

- `/api/categories/[id]` - Delete a specific category
- `/api/products/[id]` - Delete a specific product
- `/api/tags/[id]` - Delete a specific tag

#### POST

- `/api/categories` - Adds a new category
- `/api/products` - Adds a new product
- `/api/tags` - Adds a new tag

#### PUT

- `/api/categories` - Updates a category
- `/api/products` - Updates a product name
- `/api/tags` - Updates a tag name

For POST and PUT, a JSON object with the following format is used.

**Categories:**

```json
	 {
            "categoryName": "New Cat"
	 }
```

**Products:**

```json
	 {
            "product_name": "Basketball",
            "price": 200.00,
            "stock": 3,
            "tagIds": [1, 2, 3, 4]
	 }
```

**Tags:**

```json
	 {
            "tagName": "Some Tag"
	 }
```

### Execution

To run from the command line, type: 
```shell
npm start
```

### Demonstration

A video demonstration for the output of this can be found at: https://youtu.be/exbTny4FZOo

## User Story

```text
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```text
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags   
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
``` 