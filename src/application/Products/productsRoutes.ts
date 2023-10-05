import { Router } from 'express';
import productsController from './productsControllers';
const routes = Router();
import idChecker from '../../helpers/idChecker';

routes.get('/', productsController.findAll);
routes.get('/search', productsController.findByQuery);
routes.get('/:id', idChecker, productsController.findById);
routes.post('/create', productsController.create);
routes.put('/update/:id', idChecker, productsController.update);
routes.put(
  '/update/category/:id',
  idChecker,
  productsController.removeCategory,
);
routes.put('/update/rate/:id', idChecker, productsController.rateProduct);
routes.delete('/delete/:id', idChecker, productsController.delete);

export default routes;
