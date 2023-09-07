import productService from "./productsServices";

class ProductController {
    async findAll(req: any, res: any) {
        const products = await productService.findAll()
        res.status(200).json(products)
    }
    async findByQuery(req: any, res: any) {
        const query: string = req.params.query
        const products = await productService.findByQuery(query)
        res.status(200).json(products)
    }
    async findById(req: any, res: any) {
        const id: string = req.params._id
        const product = await productService.findById(id)
        res.status(200).json(product)
    }
    async create(req: any, res: any) {
        const { name, description, image_url, price } = req.body
        const createdProduct = await productService.createProduct({ name, description, image_url, price })
        res.status(200).json(createdProduct)
    }
    async update(req: any, res: any) {
        const id: string = req.params.id
        const { name, description, image_url, price } = req.body
        const updatedProduct = await productService.updateProduct(id, { name, description, image_url, price });
        res.status(200).json(updatedProduct)
    }
    async delete(req: any, res: any) {
        const id: string = req.params.id
        const deletedProduct = await productService.deleteProduct(id)
        res.status(200).json(deletedProduct)
    }
}

const productController = new ProductController()

export default productController;