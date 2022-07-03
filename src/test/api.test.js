const request = require("supertest");
const app = require("../app");

let elementId 

describe("API test", () => {

    test("GET /users/all", (done) => {
        request(app)
            .get("/users/all")
            .expect(200)
            .expect((res) => {
                console.log(res.body)
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
                name: "Bruna",
                email: "brunak@gmail.com",
                password: "Testeteste12@"

            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                elementId = res.body.savedUser._id
                return done();
            })
    })

    test("POST /users/login", (done) => {
        request(app)
            .post("/users/login")
            .expect("Content-Type", /json/)
            .send({
                email: "brunak@gmail.com",
                password: "Testeteste12@"

            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Bruneca",
                email: "bruunak@gmail.com"

            })
            .expect(200)
            .expect((res) => {
                expect(res.body.savedUser._id).toBe(elementId);
                expect(res.body.savedUser.name).toBe("Bruneca");
                expect(res.body.savedUser.email).toBe("bruunak@gmail.com")
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })

    test("DELETE /users/delete/:id", (done) => {
        request(app)
          .delete(`/users/delete/${elementId}`)
          .expect((res) => {
              console.log(res.body)
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
});
