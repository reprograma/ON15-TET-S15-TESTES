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
  .expect((response) =>{
    //console.log("BODY DA RESPOSTA", res.body);
   expect(response.body.length).not.toBe(0);

  })
  .end((err,response) => {
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
        .end((err, response) => {
            console.log("BODY DA RESPOSTA", response.body)
            if(err) return done(err);
            console.log("ID DO USUÁRIO RECÉM CRIADO", response.body.savedteacher._id)
            console.log("VARIAVEL DE ID VAZIA", elementId)
            elementId = res.body.savedTeacher._id;
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
            expect(res.body.savedTeacher._id).toBe(elementId);
            expect(res.body.savedTeacher.name).toBe("Alice Atualizado");
            expect(res.body.savedTeacher.email).toBe("aliceatualizado@email.com");
        })
        .end((err, response) => {
            if(err) return done(err);
            return done();
        })
});


    
  })

  test("DELETE /teacher/delete/:id", (done) => {
    request(app)
      .delete(`/teacher/delete/${elementId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((response) => {
        console.log(response.body)
        expect(response.body.findByIdAndDelete.email).toBe("aliceatualizado@email.com");
      })
      .end((err, response) => {
        if (err) return done(err);
        return done();
      });
  });
