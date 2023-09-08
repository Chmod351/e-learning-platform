# Index

- [About this project](#About-this-project)
 - [Configuration](#Configuration)
 - [Endpoints](#Endpoints)




## About this project
this project is an ecommerce rest api, it's uses [express]() [typescript](), [mongoose](), [typedi]().
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
 ```MONGO=mongodb+srv://username:password@cluster0.hfisa.mongodb.net/?retryWrites=true&w=majority```
 (Remember to change`username` and `password` with yours credentials).
 - Now open a terminal and run ```npm run dev```
 

 ## Endpoints:
 
 `Get All` `/api/v1/products` 
 `Get by Id` `/api/v1/products/:id` 
 `POST` `/api/v1/products/create` 
 `PUT` `/api/v1/products/update/:id` 
 `DELETE` `/api/v1/products/delete/:id` 







