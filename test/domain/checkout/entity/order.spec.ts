import Order from "../../../../src/domain/checkout/entity/order"
import OrderItem from "../../../../src/domain/checkout/entity/order_item"

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrowError("CustomerIds is required")
    })
    
    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError("Items are required")
    })

    it("should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 100, "1", 2)
        const item2 = new OrderItem("w", "Item 2", 200, "2", 2)
        const order = new Order("1", "Customer 1", [item, item2])
        const total = order.total()
        expect(total).toBe(600)
    })

    it("should throw error if the item qte is less or equal 0", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 100, "1", 0)
            const order = new Order("1", "Customer 1", [item])
        }).toThrow("Quantity must be greater than 0")
    })

})