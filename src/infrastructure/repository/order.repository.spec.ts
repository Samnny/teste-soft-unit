import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"
import Order from "../../domain/entity/order"
import OrderModel from "../db/sequelize/model/order.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"
import Product from "../../domain/entity/product"
import OrderItem from "../../domain/entity/order_item"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    product_id: product.id,
                    quantity: ordemItem.quantity,
                    order_id: order.id
                }
            ]
        })
    })

    it("should update a customer", async () => {
        
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const product2 = new Product("456", "Product 2", 20)
        await productRepository.create(product2)

        const ordemItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        )
        
        order.items.push(ordemItem2)

        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    product_id: product.id,
                    quantity: ordemItem.quantity,
                    order_id: order.id
                },
                {
                    id: ordemItem2.id,
                    name: ordemItem2.name,
                    price: ordemItem2.price,
                    product_id: product2.id,
                    quantity: ordemItem2.quantity,
                    order_id: order.id
                }
            ]
        })
    })

    it("should find a customer", async () => {
        
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderResult = await orderRepository.find(order.id)

        expect(order).toStrictEqual(orderResult)
    })

    it("should throw an error when order is not found", async () => {

        const orderRepository = new OrderRepository()
        expect(async () => {
            await orderRepository.find("456ABC")
        }).rejects.toThrow("Order not found")
    })

    it("should find all orders", async () => {

        const customerRepository = new CustomerRepository()
        
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const product2 = new Product("456", "Product 2", 20)
        await productRepository.create(product2)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        )

        const ordemItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        )

        const orderRepository = new OrderRepository()

        const order = new Order("123", "123", [ordemItem])
        await orderRepository.create(order)

        const order2 = new Order("456", "123", [ordemItem2])
        await orderRepository.create(order2)

        const orders = await orderRepository.findAll()

        expect(orders).toHaveLength(2)
        expect(orders).toContainEqual(order)
        expect(orders).toContainEqual(order2)
    })
})