import { Router } from 'express';
import customersControllers from './customersControllers';
const routes = Router();
import idChecker from '../../../helpers/idChecker';

routes.get('/', customersControllers.findAll);
routes.get('/search', customersControllers.findByQuery);
routes.get('/:id', idChecker, customersControllers.findById);
routes.post('/create', customersControllers.create);
routes.post('/login', customersControllers.login);
routes.post('/logout', customersControllers.logout);
routes.put('/update/:id', idChecker, customersControllers.update);
routes.delete('/delete/:id', idChecker, customersControllers.delete);

export default routes;
