import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"


describe("Test list product use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels( [ProductModel] )
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should list a product", async () => {

        const productRepository = new ProductRepository()
        const usecase = new ListProductUseCase(productRepository)

        const product1 = ProductFactory.create("Product", 1)
        const product2 = ProductFactory.create("Product 2", 2)
        productRepository.create(product1)
        productRepository.create(product2)
        
        const output = await usecase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[0].price).toBe(product1.price)
        expect(output.products[1].price).toBe(product2.price)
    })
})