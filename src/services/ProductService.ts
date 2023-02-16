import {PrismaClient, Product} from "@prisma/client";
import {MsSearchService} from "./MsSearchService";
import {SearchResponse} from "meilisearch";

const prisma = new PrismaClient();
const ms = new MsSearchService<Product>();

class ProductService {

    async createProduct(product: Product): Promise<Product> {
        return prisma.product.create({
            data: product
        });
    }

    async createProducts(products: Product[]): Promise<Product[]> {
        const created = [];
        for (const product of products) {
            created.push(await this.createProduct(product))
        }
        await ms.addToIndex('products', created);
        return created;
    }

    async updateProduct(product: Product): Promise<Product> {
        await ms.updateIndex('products', [product])
        return prisma.product.update({
            where: {
                id: product.id
            },
            data: product
        });
    }

    async deleteProduct(id: number): Promise<Product> {
        await ms.deleteFromIndex('products', id);
        return prisma.product.delete({
            where: {
                id: id
            }
        });
    }

    async getProducts(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async getProduct(id: number): Promise<Product | null> {
        return prisma.product.findUnique({
            where: {
                id: id
            }
        });
    }

    async searchProducts(query: string): Promise<SearchResponse<Product>> {
        return await ms.search('products', query);
    }
}

export const productService = new ProductService();