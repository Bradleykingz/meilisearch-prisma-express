import {Request, Response} from "express";
import {Product} from "@prisma/client";
import {productService} from "../services/ProductService";

class ProductsController {

    async list(req: Request, res: Response) {
        return res.json(await productService.getProducts());
    }

    async getOne(req: Request, res: Response) {
        const product = await productService.getProduct(Number(req.params.id))
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        return res.json(product);
    }

    async create(req: Request<{}, {}, Product[]>, res: Response) {
        try {
            if (!Array.isArray(req.body)) {
                return res.status(400).json({message: 'Invalid request body. Should be an array'});
            }

            await productService.createProducts(req.body);
            return res.status(201).json({message: 'Products created'});
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async update(req: Request<{}, {}, Product>, res: Response) {
        try {

            if (!req.body.id) {
                return res.status(400).json({message: 'Invalid request body. Should have an id'});
            }

            await productService.updateProduct(req.body);
            return res.json({message: 'Product updated'});

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await productService.deleteProduct(Number(req.params.id));
            return res.json({message: 'Product deleted'});
        }catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async search(req: Request, res: Response) {
        try {
            const query = req.query.q;
            if (!query) {
                return res.status(400).json({message: 'Invalid query'});
            }
            const results = await productService.searchProducts(query.toString());
            return res.json(results);
        }catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}

export const productsController = new ProductsController();