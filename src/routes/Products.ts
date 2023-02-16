import {Router} from "express";
import {productsController} from "../controllers/ProductsController";

class ProductRoutes {

        public router: Router = Router();

        constructor() {
            this.config();
        }

        config(): void {
            this.router.get('/search', productsController.search);

            this.router.get('/', productsController.list);
            this.router.get('/:id', productsController.getOne);
            this.router.post('/', productsController.create);
            this.router.put('/:id', productsController.update);
            this.router.delete('/:id', productsController.delete);

        }
}

export const productRoutes = new ProductRoutes();