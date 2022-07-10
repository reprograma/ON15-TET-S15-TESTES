const request = require("teste");
const app = require("../app")

let elementoId;

describe("API teste", () => {
    Ttest("GET /users/all", (done) => {
        request(app)
              .get("/users/all")
              .expect(200)
              .expect((res) => {
                expect(res.body.length).not.toBe(0)
              })
              .end ((err, res) => {
                if (err) return done(err)
                return done()
              })
    })
})

test("POST /users/create", (done) => {
    request(app)
          .post("/users/create")
          .expect("Content-Type", /json/)
          .send({ 
            name: "Anne",
            email: "anne@gmail.com",
            password: "senha"
          })
          .expect(201) //teste do status
          .end((err, res) => {
            if(err) return done(err);
            elementoId = res.body.savedUser._id;
            return done();
          })
})

test("PATCH /users/update/:id", (done) => {
    request(app)
    .patch(`/users/update/${elementId}`)
    .expect("Content-Type", /json/)
    .send({
        name: "Paula Atualizado",
        email: "paulaatualizado@gmail.com"
    })
    .expect(200)
    .expect((res) => {
        expect(res.body.savedUser._id).toBe(elementoId)
        expect(res.body.savedUser.name).toBe("Paula Atualizado");
        expect(res.body.savedUser.email).toBe("paulaatualizado@gmail.com")
    })
    .end((err, res) => {
        if (err) return done(err)
        return done()
    })
})

test("DELETE /users/delete/:id", (done) => {
    request(app)
        .delete(`/users/delete/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
            console.log(res.body)
            expect(res.body.userFound.email).toBe("paulaatualizado@gmail.com")
        })
        .end((err, res) => {
            if(err) return done(err)
            return done();
        });
});
/*
Funções JEST
describe() - agrupa um conjunto de testes individuais
Recebe dois parâmetros, o nome dos testes e uma função anônima
test() ou it() - fazem a mesma coisa, realizam um teste individual, vamos usar o test na aula por ser mais semântico
// primeiro parâmetro é o endpoint: o verbo e a rota, precisa da barra antes, precisa da rota raíz e da rota do verbo
o done ali é quando o teste acaba
*/ 