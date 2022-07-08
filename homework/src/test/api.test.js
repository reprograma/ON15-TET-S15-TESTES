const request = require('supertest')
const app = require('../app')

let elementId;

describe("API user test", () => {
    //getAll test
    test("GET /user/all", (done) => {
        request(app)
            .get("/user/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })

    test("POST /user/create", (done) => {
        request(app)
            .post("/user/create")
            .expect("Content-Type", /json/)
            .send({
                name: "Bruna",
                email: "bruna124@email.com",
                password: "senha12"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body._id
                // console.log(elementId)
                return done()
            })
    })

    test("PUT /user/update/:id", (done) => {
        request(app)
            .put(`/user/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Bruna Atualizado",
                email: "brubru@email.com"
            })
            .expect(200)    
            .expect((res) => {
                expect(res.body._id).toBe(elementId)
                expect(res.body.name).toBe("Bruna Atualizado")
                expect(res.body.email).toBe("brubru@email.com")
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })

    })
    test("DELETE /user/delete/:id", (done) => {
        request(app)
            .delete(`/user/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.user._id).toBe(elementId)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })


})

let clientId;

describe("Orders", () => {
    test("GET /order/all", (done) => {
        request(app)
            .get("/order/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
    test("POST, /client/create", (done) => {
        request(app)
            .post("/client/create")
            .expect("Content-Type", /json/)
            .send({
                name: "José Vieira",
                socialName: "Adriana Vieira",
                address: "R. Frajola",
                number: 50,
                phone: "9999-6666",
                referencePoint: "ao lado da igreja"
        })
        .expect(201)
        .end((err, res) => {
            if(err) return done(err);
            clientId = res.body._id;
            return done();
        })

    })
    test("POST, /order/create", (done) => {
        request(app)
            .post("/order/create")
            .expect("Content-Type", /json/)
            .send({
                client: clientId,
                description: "cerveja",
                price: 10
        })
        .expect(201)
        .end((err, res) => {
            if(err) return done(err);
            elementId = res.body._id;
            return done();
        })
    })
    test("PUT /order/update/:id", (done) => {
        request(app)
            .put(`/order/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                price: 70.50,
                
            })
            .expect(200)    
            .expect((res) => {
                expect(res.body._id).toBe(elementId)
                expect(res.body.price).toBe(70.50)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })

    })
    test("DELETE /order/delete/:id", (done) => {
        request(app)
            .delete(`/order/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(elementId)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
})
