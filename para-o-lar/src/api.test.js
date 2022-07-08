const request = require("supertest");
const app = require("../src/app")
describe("API test", () => {
            test("GET /artist/all", (done) => {
                request(app)
                    .get("/")
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.length).not.toBe(0);
                    })
                    .end((err, res) => {
                        if (err) return done(err);
                        return done();
                    });
            });
            test("POST /artist/create", (done) => {
                request(app)
                    .post("/artist/create")
                    .expect("Content-Type", /json/)
                    .send({
                        name: "Cassia Ele",
                        music: "Malandragem",
                        password: "senha1234"
                            .expect(201)
                            .end((err, res) => {
                                if (err) return done(err);
                                elementId = res.body.savedArtist._id;

                            });
                    });
                test("PATCH /artist/update/:id", (done) => {
                    request(app)
                        .patch(`/artist/update/${elementId}`)
                        .expect("Content-Type", /json/)
                        .send({
                            name: "Cassia Eller",
                            music: "Malandragem"
                        })
                        .expect(200)

                    .expect((res) => {
                            expect(res.body.savedArtist._id).toBe(elementId);
                            expect(res.body.savedUser.name).toBe("Cassia Eller");
                            expect(res.body.savedArtist.music).toBe("Malandragem");
                        })
                        .end((err, res) => {
                            if (err) return done(err);
                            return done();
                        })
                });
                test("DELETE /artist/delete/:id", (done) => {
                    request(app)
                        .delete(`/artist/delete/${elementId}`)
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .expect((res) => {
                            console.log(res.body)
                            expect(res.body.artistFound.name).toBe("Cassia Eller");
                        })
                        .end((err, res) => {
                            if (err) return done(err);
                            return done();
                        });
                });
            });