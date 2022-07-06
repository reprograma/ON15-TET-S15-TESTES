const request = require("supertest");
const app = require ("../app");

//jest.setTimeout(3000);
//jest.useRealTimers();

let elementId;

describe("API test", () =>{
test ("GET/teacher/all", (done) =>{
 request(app)
  .get("/teacher/all")
  .expect(200) 
  .expect((res) =>{
    //console.log("BODY DA RESPOSTA", res.body);
   expect(res.body.length).not.toBe(0);

  })
  .end((err,res) => {
    if(err) return done(err);
    return done();
  });

  });

  test("POST /teacher/create", (done) => {
    request(app)
        .post("/teacher/create")
        .expect("Content-Type", /json/)
        .send({
            name: "Alice",
            email: "alice@email.com",
            password: "minhasenha"
        })
        .expect(201)
        .end((err, res) => {
            console.log("BODY DA RESPOSTA", res.body)
            if(err) return done(err);
            console.log("ID DO USUÁRIO RECÉM CRIADO", res.body.savedUser._id)
            console.log("VARIAVEL DE ID VAZIA", elementId)
            elementId = res.body.savedUser._id;
            console.log("VARIAVEL DE ID PREENCHIDA", elementId)

            return done();
        });
});
test("PATCH /teacher/update/:id", (done) => {
    request(app)
        .patch(`/teacher/update/${elementId}`)
        .expect("Content-Type", /json/)
        .send({
            name: "Alice Atualizado",
            email: "aliceatualizado@email.com"
        })
        .expect(200)
        .expect((res) =>{
            expect(res.body.savedUser._id).toBe(elementId);
            expect(res.body.savedUser.name).toBe("Alice Atualizado");
            expect(res.body.savedUser.email).toBe("aliceatualizado@email.com");
        })
        .end((err, res) => {
            if(err) return done(err);
            return done();
        })
});


    
  })