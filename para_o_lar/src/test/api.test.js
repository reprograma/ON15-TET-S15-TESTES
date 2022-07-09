const request = require("supertest") 
const app = require("../app") 


let elementId;

describe("API test", () => {

    test("GET /users/all", (done) => {
       request(app)
            .get("/users/all") 
            .expect(200) 
            .expect((response) => {
                console.log("BODY DA RESPOSTA", response.body)
                expect(response.body.length).not.toBe(0)
            })
            .end((error, response) => {
                if (error) return done(error)
                return done()
            })
    })

//teste para POST

    test("POST /create/user", (done) => { 
        request(app)
            .post("/users/create/user")
            .expect("Content-Type", /json/) 
            .send({ 
                name: 'Joana Atualizado',
                email: 'joanaatualizado@email.com',
                password: "senhaatualizadadajoana"
            })
            .expect(201)
            .end((error, response) => {
                if (error) return done(error)
                console.log("ID DO USUÁRIO RECÉM CRIADO", response.body.savedUser._id) 
                console.log("VARIAVEL DE ID VAZIA", elementId)
                elementId = response.body.savedUser._id; 
                console.log("VARIAVEL DE ID PREENCHIDA", elementId)
                return done()
            })
    })


// TESTE PARA PATCH (ATUALIZAR)

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: 'Joana Atualizado',
                email: 'joanaatualizado@email.com'
            })
            .expect(200)
            .expect((response) =>{
                expect(response.body.savedUser._id).toBe(elementId)
                expect(response.body.savedUser.name).toBe('Joana Atualizado')
                expect(response.body.savedUser.email).toBe('joanaatualizado@email.com')
            })
            .end((error, response) => {
                if(error) return done(error)
                return done()
            })
    })

// TESTE PARA DELETE 

    test("DELETE /users/delete/:id", async () => {
        const response = await request(app)
        .delete(`/users/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                id: '62c34a7786afa52a50181c55',
            })
            expect(200)
            expect((response) =>{
                expect(response.body.id).toBe(Object.id)
            })

      })

      
    // test("DELETE /users/delete/:id", (done) => {
    //     request(app)
    //         .delete(`/users/delete/${elementId}`)
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .expect((response) =>{
    //             expect(response.body.userFound.email).toBe('joanaatualizado@email.com')
    //         })
    //         .end((error, response) => {
    //             if(error) return done(error)
    //             return done()
    //         })
    // })

    
})

 
 



