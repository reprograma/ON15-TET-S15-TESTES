const request = require("supertest");
const app = require("../app");

let elementId;

describe("API test", () => {

    test("GET /feira/all", (done) => {
        request(app)
        .get("/feira/all")
        .expect(200)
        .expect((res) => {
            expect(res.body.length).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

    test("POST /feira/register", (done) => {
        request(app)
        .post("/feira/register")
        .expect("Content-Type", /json/)
        .send({
            name: "feira",
            email: "feira@email.com",
            category: "massa",
            instagram: "@feira",
            password: "feira1234"
        })
        .expect(201)
        .end((err, res) => {
            if(err) return done(err);
            elementId = res.body.savedBusiness._id;
            return done();
        });
    });

    test("DELETE /feira/delete/:id", (done) => {
        request(app)
        .delete(`/feira/delete/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
            console.log(res.body)
            expect(res.body.deletedBusiness.email).toBe("feira@email.com");
        })
        .end((err, res) => {
            if(err) return done(err);
            return done();
        });
    });
});