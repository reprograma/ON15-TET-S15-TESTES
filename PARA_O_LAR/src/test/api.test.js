const request = require("supertest");
const app = require("../app");



describe("API test", () => {
    
    test("GET /music/all", (done) => {
        request(app)
            .get("/music/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    
    
});
