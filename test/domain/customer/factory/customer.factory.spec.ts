import Address from "../../../../src/domain/customer/value-object/address"
import CustomerFactory from "../../../../src/domain/customer/factory/customer.factory"

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        
        let customer = CustomerFactory.create("John")
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.address).toBeUndefined()
    })

    it("should create a customer with an address", () => {

        const address = new Address("Street", 1010, "Zip", "City")
        
        let customer = CustomerFactory.createWithAddress("John", address)
        
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.address).toBe(address)
    })
})