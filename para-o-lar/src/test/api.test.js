const request = require("supertest")
const app = require("../app")

let elementId

describe("Museum test", () => {
    test("GET /museums/all", (done) => {
        request(app) 
            .get("/museums/all") 
            .expect(200) 
            .expect((res) => {
                console.log("body da resposta", res.body)
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    test("GET /museums/with-tags", (done) => {
        request(app) 
            .get("/museums/with-tags") 
            .expect(200) 
            .expect((res) => {
                console.log("body da resposta", res.body)
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })


})