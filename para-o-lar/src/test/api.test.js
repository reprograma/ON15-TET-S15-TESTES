const request = require("supertest")
const app = require("../app")

let elementId

describe("API test", () => {
    test("GET /users/all", (done) => {
        request(app) //realizar conexão
            .get("/users/all") //fazer um get
            .expect(200) //expectativa do resultado
            .expect((res) => {
                console.log("body da resposta", res.body)
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    test("POST /users/create", (done) => {
        request(app)
            .post("/users/create")
            .expect("Content-type", /json/)
            .send({
                name: "Alguém",
                email: "alguem@email",
                password: "senhadificil"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body.savedUser._id
                return done()
            })
    })

    test("PATCH /users/update/:id", (done) =>{
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-type", /json/)
            .send({
                name: "testando",
                email: "testando@email"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.savedUser._id).toBe(elementId)
                expect(res.body.savedUser.name).toBe("testando")
                expect(res.body.savedUser.email).toBe("testando@email")
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
})