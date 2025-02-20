import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import { v4 as uuid } from "uuid"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer("123", "Samn")
const address = new Address("Rua 2", 10, "12560-789", "Fortal")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find customer use case", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Samn",
            address: {
                street: "Rua 2",
                number: 10,
                zip: "12560-789",
                city: "Fortal"
            }
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

    it("should not find a customer", () => {

        const customerRepository = MockRepository()
        customerRepository.find.mockImplementationOnce(() => {
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Customer not found")
    })
})