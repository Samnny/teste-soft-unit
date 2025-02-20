import { app, sequelize } from "../../../../src/infrastructure/api/express"
import request from "supertest"

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Borracha",
                price: 1
        })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Borracha")
        expect(response.body.price).toBe(1)
    })

    it("should not create a product", async () => {

        const response = await request(app)
            .post("/product")
            .send({
                name: "Borracha"
        })

        expect(response.status).toBe(500)
    })

    it("should list all product", async () => {

        const response1 = await request(app)
            .post("/product")
            .send({
                name: "Borracha",
                price: 1
        })
        
        expect(response1.status).toBe(200)

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Lápis",
                price: 2
        })
        
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/product").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)

        const product1 = listResponse.body.products[0]
        const product2 = listResponse.body.products[1]

        expect(product1.name).toBe("Borracha")
        expect(product1.price).toBe(1)
        expect(product2.name).toBe("Lápis")
        expect(product2.price).toBe(2)
    })
})