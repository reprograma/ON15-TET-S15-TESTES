const request = require("supertest")
const app = require("../app")

// jest.setTimeout(30500)
// jest.useRealTimers()
let elementId

describe("API test", () => {
    //agrupa vários testes
    //testar primeiro a rota GET

    test("GET /users/all", (done) => {
        request(app)//conexão aconteceu
            .get("/users/all")//validar rota
            .expect(200)//status da resposta que estou esperando
            .expect((response) => {
                expect(response.body.length).not.toBe(0)
            })
            .end((erro, response) => {
                if (erro) return done(erro)
                return done()
            })
    })

    test("POST /users/create", (done) => {
        request(app)
            .post("/users/create")
            .expect("Content-Type", /json/)
            .send({
                name: "Carol",
                email: "carol@email.com",
                password: "senhamuitodificil"
            })
            .expect(201)
            .end((erro, response) => {
                console.log("BODY DA RESPOSTA", response.body)
                if (erro) return done(erro)
                elementId = response.body.savedUser._id
                return done()
            })
    })

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Carol Atualizado",
                email: "carolatualizado@email.com"
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.savedUser._id).toBe(elementId);
                expect(response.body.savedUser.name).toBe("Carol Atualizado");
                expect(response.body.savedUser.email).toBe("carolatualizado@email.com");
            })
            .end((erro, response) => {
                if (erro) return done(erro)
                return done()
            })
    })
})
