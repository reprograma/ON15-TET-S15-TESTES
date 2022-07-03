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

    test("POST /users/signup", (done) => {
        request(app)
            .post("/users/signup")
            .expect("Content-Type", /json/)
            .send({
                name: "Bruna",
                email: "teste2@gmail.com",
                password: "Testeteste12@",
                role: "admin"

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
                email: "teste2@gmail.com",
                password: "Testeteste12@",

            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })

    test("GET /users/user/:id", (done) => {
        request(app)
            .get(`/users/user/${elementId}`)
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

    test("PATCH /users/update-password/:id", (done) => {
        request(app)
            .patch(`/users/update-password/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                password: "Kid@belhabk8899"

            })
            .expect(200)
            .expect((res) => {
                expect(res.body.savedUser._id).toBe(elementId);
                expect(res.body.savedUser.name).toBe("Bruna");
                expect(res.body.savedUser.email).toBe("teste2@gmail.com")
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })

    test("PUT /users/update-user/:id", (done) => {
        request(app)
            .put(`/users/update-user/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Bruna Kathellyn"

            })
            .expect(200)
            .expect((res) => {
                expect(res.body.user._id).toBe(elementId);
                expect(res.body.user.name).toBe("Bruna Kathellyn")
                expect(res.body.user.email).toBe("teste2@gmail.com")
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