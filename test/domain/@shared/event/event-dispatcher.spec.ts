import SendEmailWhenProductIsCreateHandler from "../../../../src/domain/product/event/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../../../../src/domain/product/event/product-created.event"
import EventDispatcher from "../../../../src/domain/@shared/event/event-dispatcher"

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreateEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    it("should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
    })

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()
        const spyEventHandler= jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent ({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        })
        eventDispatcher.notify(productCreatedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })
})