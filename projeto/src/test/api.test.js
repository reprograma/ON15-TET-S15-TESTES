const request = require("supertest")
const app = require("../app")

describe("API test", () => {

    test("GET /members/all", (done) => {
        request(app) 
            .get("/members/all") 
            .expect(200) 
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    test("POST /members/create", (done) => {
        request(app)
            .post("/members/create")
            .expect("Content-Type", /json/)
            .send({
                name: "Gabriel",
                socialName: "Gabriela",
                age: "24",
                address: "Rua Reprograma, 00",
                telephone: "1111-2222",
                cpf: "111.111.111-11"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body.savedUser.id
                return done()
            })
    })
})