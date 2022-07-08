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



    test("POST /museums/create", (done) => {
        request(app)
            .post("/museums/create")
            .expect("Content-Type", /json/)
            .send({
                name: "exemplo",
                descripton: "lorem ipsum",
                neighborhood: "exemplo",
                address: "exemplo",
                phone: ["11111111", "2222222"],
                website: "www.site.com",
                tickets: ["unica"]
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body.savedMuseum._id
                return done()
            })
    })

    test("PUT /museums/update/:id", (done) => {
        request(app)
            .put(`/museums/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "testando",
                description: "lorem ipsum",
                address: "testando"
            })
            .expect(200)
            .expect((res) =>{
                expect(res.body.updatedMuseum._id).toBe(elementId)
                expect(res.body.updatedMuseum.name).toBe("testando")
                expect(res.body.updateduseum.description).toBe("lorem ipsum")
                expect(res.body.updatedMuseum.address).toBe("testando")
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    test("DELETE /museums/delete/:id", (done) => {
        request(app)
            .delete(`/museums/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                console.log(res.body)
                expect(res.body.deletedMuseum)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
})