# Index

- [About this project](#About-this-project)
- [Configuration](#Configuration)
- [Endpoints](#Endpoints)

## About this project

this project is an ecommerce rest api, it's uses express typescript,mongoose, typedi. morgan
The project use a [modular architecture](https://scorpionconmate.notion.site/scorpionconmate/The-Folder-Hell-in-Typescript-ed146a5d32e4476794b79b6190e4afc0) to keep it scalable and easy to maintain.

## Configuration

To use this project in your local follow the next steps:

- Create an account on [mongodb atlas](https://www.mongodb.com/atlas).
- Select the `free version` of the cloud storage for your api.
- Create yours credentials (username, password) for yours db.
- go to `Network Access` and add your IP Address and confirm.
- Once we have our `cluster, user, and IP`, we can go to the `Database section` (located on the left side of the panel, at the top), and choose the connection method. For this case, we will select `Connect your application.`
- Now you have an URL like this `mongodb+srv://username:password@cluster0.hfisa.mongodb.net/?retryWrites=true&w=majority`
- Now, you need to create a .env file in the root of your local project, and now paste this:
  `MONGO=mongodb+srv://username:password@cluster0.hfisa.mongodb.net/?retryWrites=true&w=majority`
  (Remember to change`username` and `password` with yours credentials).
- Now open a terminal and run `npm run dev`

## Endpoints:

`Get All` `/api/v1/products` This endpoint will return all the products stored in the database contained in an array.
Example:
`Get by Id` `/api/v1/products/:id` (This endpoint will search for the product by its product ID, and if there is no product with such an ID, it will return null. To search by ID, you should pass the ID as a parameter.)
`Get By Query` `http://localhost:4000/api/v1/products/search` You can search a product by name or description sending those parameters as a query
`POST` `/api/v1/products/create` To `create` a product, you need the name, description, image URL, and price
`PUT` `/api/v1/products/update/:id` To `edit` a product you need the id, and you can change the name, description, image URL, and price
`DELETE` `/api/v1/products/delete/:id` To `delete` a product you need the id,
