const request = require("supertest");
const app = require("../app");
let elementId;

describe("API test", () => {
    test("GET /stores/all", (done) => {
        request(app)
            .get("/stores/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });


    test("POST /stores/create", (done) => {
        request(app)
            .post("/stores/create")
            .expect("Content-Type", /json/)
            .send({

                user:"Anna Carolina",
                email:"testenovo@email.com",
                password: "teste1234",
                storeName:"Decor Teste",
                address:"teste",
                number:1234,
                district:"teste",
                City: "teste",
                telephone: 40405050,
                payment:"teste",
                site: "www.teste.com" 
                
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                elementId = res.body.savedUser_id;
                return done();
            });
    });
});

