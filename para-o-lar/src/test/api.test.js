const request = require("supertest");
const app = require("../app");

let elementId;

describe("API test", () => {
    test("GET /musics", (done) => {
        request(app)
            .get("/musics")
            .expect(200)
            .expect((res) => {
            expect(res.body.length).not.toBe(0)
        })
            .end((err, res) => {
            if(err) return done(err)
            return done();
        });

    });

    test("GET /music/:id", (done) => {
        request(app)
            .get(`/music/get/${elementId}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.length).not.toBe(0)
        })
            .end((err, res) => {
            if(err) return done(err)
            return done();
        });

    });

    test("POST /music/create", (done) => {
        request(app)
            .post("/music/create")
            .expect("Content-Type", /json/)
            .send({
                artista: "Fulana",
                compositor: "Fulana2",
                titulo: "Testando"

            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                return done();
            });

    });

});