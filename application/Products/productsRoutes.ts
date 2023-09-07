import { Router } from "express";
import productsController from "./productsControllers"
const routes = Router();

routes.get("/", productsController.findAll);
routes.get("/:id", productsController.findById);
routes.post("/create", productsController.create);
routes.put("/update/:id", productsController.update);
routes.delete("/delete/:id", productsController.delete);

export default routes