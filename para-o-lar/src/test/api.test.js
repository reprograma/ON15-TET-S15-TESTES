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

    test("POST /music/create", (done) => {
        request(app)
            .post("/music/create")
            .expect("Content-Type", /json/)
            .send({
                artist: "Fulana",
                composer: "Fulana2",
                title: "Testando",
            })
            .expect(201)
            .end((err, res) => {
                console.log("RESPOSTA", res.body)
                if(err) return done(err);
                elementId = res.body.savedMusic._id;
                return done();
            });

    });

    test("GET /music/:id", (done) => {
        request(app)
            .get(`/music/${elementId}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.length).not.toBe(0)
        })
            .end((err, res) => {
            if(err) return done(err)
            return done();
        });

    });


    test("PATCH /update/:id", (done) => {
        request(app)
            .patch(`/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                artist: "Artista Atualizado",
                composer: "compositor atualizado",
                title: "testando"
            })
            .expect(200)
            .expect((res)=>{
                const expected = ["compositor atualizado"];
                expect(res.body.savedMusic._id).toBe(elementId);
                expect(res.body.savedMusic.artist).toBe("Artista Atualizado");
                expect(res.body.savedMusic.composer).toEqual(expect.arrayContaining(expected));
                expect(res.body.savedMusic.title).toBe("testando");
            })
            .end((err, res) => {
                if(err) return done(err); 
                return done();
            });
    });

    test("DELETE /music/delete/:id", (done) => {
        request(app)
            .delete(`/delete/${elementId}`)
            .expect(200)
    
            .end((err, res) => {
                if(err) return done(err)
                return done();
            });
    });

});