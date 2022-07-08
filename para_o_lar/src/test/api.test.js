const request = require("supertest")
const app = require ("../app")

let elementId

describe("API Movies", () => {
    //(nome do método rota, (done) =>)
    it("GET /movies/all", (done) => {
        request(app)
            .get("/movies/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(0)
            })
            .end((err,res) => {
                if(err) return done(err)
                return done()
            })
    })

    it("POST /movies/create", (done) => {
        request(app)
            .post("/movies/create")            
            .expect("Content-Type", /json/)
            .send({
                Title: "Inception",
                Year: "2010",
                Genre: ["Ficção científica", "Suspense"],
                Runtime: "2h28m",
                Director: ["Christopher Nolan"],
                Actors: ["Leonardo DiCaprio", "Marion Cotillard", "Elliot Page"],
                Plot: "There are many variations of passages of Lorem Ipsum available."
            })
            .expect(201)
            .end((err,res) => {
                if(err) return done(err)
                elementId = res.body.savedMovie._id
                return done()
            })
    })

    it("PATCH /movies/update/:id", (done) => {
        request(app)
            .patch(`/movies/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                Actors: ["Leonardo Di Caprio", "Marion Cotillard", "Elliot Page"]
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.savedMovie._id).toBe(elementId)
            })
            .end((err,res) => {
                if(err) return done(err)
                return done()
            })
    })
    
    it("DELETE /movies/delete/:id", (done) => {
        request(app)
            .delete(`/movies/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                console.log(res.body)
                expect(res.body.movieFound._id).toBe(elementId)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    
})
