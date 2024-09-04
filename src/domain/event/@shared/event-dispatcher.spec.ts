describe("Domain events tests", () => {

    it("should register an event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreateEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(1)
    })
})