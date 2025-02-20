import CustomerFactory from "../../../../src/domain/customer/factory/customer.factory";
import Address from "../../../../src/domain/customer/value-object/address";
import ListCustomerUseCase from "../../../../src/usecase/customer/list/list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Samn", 
    new Address("Rua 2", 10, "45698-785", "Fortal")
)

const customer2 = CustomerFactory.createWithAddress("Pedro", 
    new Address("Rua 3", 20, "45798-785", "Fortal")
)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        update: jest.fn()
    }
}

describe("Unit test for listing customer use case", () => {

    it("should list a customer", async () => {

        const customerRepository = MockRepository()
        const useCase = new ListCustomerUseCase(customerRepository)
        const output = await useCase.execute({})

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer1.id)
        expect(output.customers[1].id).toBe(customer2.id)
        expect(output.customers[0].name).toBe(customer1.name)
        expect(output.customers[1].name).toBe(customer2.name)
        expect(output.customers[0].address.street).toBe(customer1.address.street)
        expect(output.customers[1].address.street).toBe(customer2.address.street)
    })
})