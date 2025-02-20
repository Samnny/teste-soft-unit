import CustomerFactory from "../../../../src/domain/customer/factory/customer.factory";
import Address from "../../../../src/domain/customer/value-object/address";
import UpdateCustomerUseCase from "../../../../src/usecase/customer/update/update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Samn", 
    new Address("Rua 2", 10, "12345-789", "Fortal")
)

const input = {
    id: customer.id,
    name: "Samn updated",
    address: {
        street: "Rua 2 updated",
        number: 102,
        zip: "12345-789 updated",
        city: "Fortal updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn()
    }
}

describe("Unit test for customer update use case", () => {

    it("should update a customer", async () => {

        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})