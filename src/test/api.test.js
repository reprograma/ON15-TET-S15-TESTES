const request = require("supertest") //importa supertest usa jest para fazer teste. Supertest usa junto com Jest. simul requisição e resposta
const app = require("../app") // APP tem o express e faz a conexão com o servidor

// jest.setTimeout((30500),
// jest.useRealTimers(),

let elementId;

describe("API test", () => {
    //agrupa vários testes
    //testar primeiro a rota GET
    //describe e test são do jest

    test("GET /users/all", (done) => {
       request(app)
            .get("/users/all") //teste fazer um get (O Supertest vai testar o get, fazer o get)
            .expect(200) //esperando que aconteça 200, que é ok (status 200) - expect = esperando
            .expect((response) => {
                console.log("BODY DA RESPOSTA", response.body)
                expect(response.body.length).not.toBe(0)
            })
            .end((error, response) => {
                if (error) return done(error)
                return done()
            })
    })

//teste para POST

    test("POST /users/create", (done) => { // o usuário criado vai para o banco de dados Mongo, igual quando era criado no Postman
        request(app)
            .post("/users/create")
            .expect("Content-Type", /json/) 
            .send({ // é o que enviamos no Body do postman para cadastrar um usuário novo
                name: "Paula",
                email: "paula@gmail.com",
                password: "senhamuitodificil"
            })
            .expect(201)
            .end((error, response) => {
                if (error) return done(error)
                console.log("ID DO USUÁRIO RECÉM CRIADO", response.body.savedUser._id) //pegar o id do usuário que acabamos de criar
                console.log("VARIAVEL DE ID VAZIA", elementId)
                elementId = response.body.savedUser._id; // retribuição de valor. A variável da linha 7 que não tinha valor terá o valor do id
                console.log("VARIAVEL DE ID PREENCHIDA", elementId)
                return done()
            })
    })

    // PATCH ATUALIZAR

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Paula Atualizado",
                email: "paulaatualizado@email.com"
            })
            .expect(200)
            .expect((res) =>{
                expect(res.body.savedUser._id).toBe(elementId);
                expect(res.body.savedUser.name).toBe("Paula Atualizado");
                expect(res.body.savedUser.email).toBe("paulaatualizado@email.com");
            })
            .end((err, res) => {
                if(err) return done(err);
                return done();
            })
    });


})