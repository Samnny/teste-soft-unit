import ProductFactory from "../../../src/domain/product/entity";

const product = ProductFactory.create("Product", 1)

const input = {
    id: product.id,
    name: "Product updated",
    price: 2
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Unit test for product update use case", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository()
        const productUpdateUseCase = new UpdateProductUseCase(productRepository)
        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})