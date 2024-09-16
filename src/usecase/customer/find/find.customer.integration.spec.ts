import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import { v4 as uuid } from "uuid"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

describe("Test find customer use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels( [CustomerModel] )
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Samn")
        const address = new Address("Rua 2", 10, "12560-789", "Fortal")
        customer.changeAddress(address)

        await customerRepository.create(customer)

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
})