import EventDispatcher from "../@shared/event-dispatcher"
import ProductCreatedEvent from "../product/product-created.event"
import CustomerChangeAddressEvent from "./customer-change-address.event"
import CustomerCreatedEvent from "./customer-created.event"
import SendConsoleLog1IsCreateHandler from "./handler/send-console-log-1.handler"
import SendConsoleLog2IsCreateHandler from "./handler/send-console-log-2.handler"
import SendConsoleLogIsChangeAddressHandler from "./handler/send-console-log-change-address.handler"


describe("Customer created test", () => {

    it("should notify all event created customer", () => {

        const eventDispatcher = new EventDispatcher()

        const eventHandler1 = new SendConsoleLog1IsCreateHandler()
        const eventHandler2 = new SendConsoleLog2IsCreateHandler()

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
    
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2)

        const customerCreatedEvent = new CustomerCreatedEvent ({ name: "Client 1" })

        eventDispatcher.notify(customerCreatedEvent)
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })


    it("should notify all event customer change address", () => {

        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendConsoleLogIsChangeAddressHandler()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler)
    
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent ({ 
            id: "123",
            name: "Client 1",
            address: {
                street: "Rua 123 de janeiro, 30"
            }
         })

        eventDispatcher.notify(customerChangeAddressEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })
})