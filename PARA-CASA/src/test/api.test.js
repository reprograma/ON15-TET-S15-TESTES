const request = require("supertest")
const { response } = require("../app")
const app = require("../app")

let elementId

describe("API test", () => {
    
    test("GET /filmes/todos", (done) => {
        request(app)
            .get("/filmes/todos")
            .expect(200)
            .expect((response) => {
                expect(response.body.length).not.toBe(0)
            })
            .end((erro, response) => {
                if (erro) return done(erro)
                return done()
            })
    })

    test("POST /filmes/cadastrar", (done) => {
        request(app)
            .post("Content-Type", /json/)
            .send({
                titulo: "Testando titulo",
                genero: "testando genero"
            })
            .expect(201)
            .end((erro, response) => {
                if (erro) return done(erro)
                elementId = response.body.salvarFilme._id
                return done()
            })
    })

})

