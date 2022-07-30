const request = require("supertest");
const app = require("../app");



let elementId;

describe("API test", () => {
 
    test("GET /search", (done) => {
        request(app)
            .get("/search")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("POST /new", (done) => {
        request(app)
            .post("/new")
            .expect("Content-Type", /json/)
            .send({
                id: 18,
                nomeDoDrink: "Chevete",
                ingredientes:["Corote", "Leite condensado", "água"],
                valor: 11,00
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                elementId = res.body.savedDrink._id;
                return done();
            });
    });

    test("PATCH /upadate/value/:id", (done) => {
        request(app)
            .patch(`/update/value${elementId}`)
            .expect("Content-Type", /json/)
            .send({
               id: 1,
               value: 13,00
            })
            .expect(200)
            .expect((res) =>{
                expect(res.body.savedUser._id).toBe(elementId);
              
            })
            .end((err, res) => {
                if(err) return done(err);
                return done();
            });
    });

    test("DELETE /remove/:id", (done) => {
        request(app)
          .delete(`/remove/${elementId}`)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            console.log(res.body)
            expect(res.body.userFound.email).toBe("bloodymary");
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
});
