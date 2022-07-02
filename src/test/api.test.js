const request = require('supertest');
const app = require('../app');

//agrupa vários testes
describe("API test", () => {
    //testar get all

    test("GET /users/all", (done) => {
        request(app) //chama o supertest e o app
            .get("/users/all") //testa conexão
            .expect(200) //resposta esperada
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
                
            })
        })
    test("POST /users/create", (done) => {
        request(app)
            .post("/users/create")
            .expect("Content-Type", /json/)
            .send({
                name: "Eliza",
                email: "eliza@email.com",
                password: "12345"
            })
            .expect(201)
            .end((err, res) =>{
                if(err) return done(err)
                return done()
            })
    })
    

})
   