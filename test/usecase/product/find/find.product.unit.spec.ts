import Product from "../../../../src/domain/product/entity/product"
import FindProductUseCase from "../../../../src/usecase/product/find/find.product.usecase"

const product = new Product("123", "Product", 2)
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find product use case", () => {

    it("should find a product", async () => {

        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product",
            price: 2
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

    it("should not find a product", () => {

        const productRepository = MockRepository()
        productRepository.find.mockImplementationOnce(() => {
            throw new Error("Product not found")
        })
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Product not found")
    })
})