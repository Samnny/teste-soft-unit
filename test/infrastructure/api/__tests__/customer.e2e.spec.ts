import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Elena",
                address: {
                    street: "Rua 2",
                    number: 10,
                    zip: "56842-78",
                    city: "Fosca"
                }
        })
        
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Elena")
        expect(response.body.address.street).toBe("Rua 2")
        expect(response.body.address.number).toBe(10)
        expect(response.body.address.zip).toBe("56842-78")
        expect(response.body.address.city).toBe("Fosca")
    })

    it("should not create a customer", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "Elena"
        })

        expect(response.status).toBe(500)
    })

    it("should list all customer", async () => {

        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "Elena",
                address: {
                    street: "Rua 2",
                    number: 10,
                    zip: "56842-78",
                    city: "Fosca"
                }
        })
        
        expect(response1.status).toBe(200)

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Damon",
                address: {
                    street: "Rua 2",
                    number: 10,
                    zip: "56842-78",
                    city: "Fosca"
                }
        })
        
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/customer").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)

        const customer1 = listResponse.body.customers[0]
        const customer2 = listResponse.body.customers[1]

        expect(customer1.name).toBe("Elena")
        expect(customer1.address.street).toBe("Rua 2")
        expect(customer2.name).toBe("Damon")
        expect(customer2.address.street).toBe("Rua 2")
    })
})