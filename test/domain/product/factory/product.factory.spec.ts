import ProductFactory from "../../../../src/domain/product/factory/product.factory"

describe("Product factory unit test", () => {
    
    it("should create a proct type a", () => {

        const product = ProductFactory.create("Product A", 1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })
})