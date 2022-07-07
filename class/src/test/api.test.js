const request = require("supertest");
const app = require("../app");

let elementId //var criada pra receber o id criado

describe("API test", () => {
    // agrupa vários testes
    // testar get all

    test("GET /users/all", (done) => {
        request(app) // chama o supertest e o app
            .get("/users/all") // testa conexão
            .expect(200) // resposta esperada
            .expect((res) => {
                expect(res.body.length).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("POST /users/create", (done) => {
        request(app)
            .post("/users/create")
            .expect("Content-Type", /json/)
            .send({
                name: "Paula",
                email: "paula@email.com",
                password: "senhamuitodificil"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                // recebe a reatribuição com o id gerado na criação
                elementId = res.body.savedUser._id;
                return done();
            });
    });

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Paula Atualizado",
                email: "paulaatualizado@email.com"
            })
            .expect(200)
             // conferir se foi atualizado
            .expect((res) =>{
                expect(res.body.savedUser._id).toBe(elementId);
                expect(res.body.savedUser.name).toBe("Paula Atualizado");
                expect(res.body.savedUser.email).toBe("paulaatualizado@email.com");
            })
            .end((err, res) => {
                if(err) return done(err);
                return done();
            });
    });

    test("DELETE /users/delete/:id", (done) => {
        request(app)
          .delete(`/users/delete/${elementId}`)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            console.log(res.body)
            expect(res.body.userFound.email).toBe("paulaatualizado@email.com");
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
});
