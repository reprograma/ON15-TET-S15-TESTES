const request = require('supertest')
const app = require('../app')
let elementId;

describe('API Test',()=>{

    test('GET /users/all',(done)=>{
         request(app)
        .get('/users/all')
        .expect(200)
        .expect((res)=>{
            console.log("Resposta do get/all",res.body)
        })
        .end((err,res)=>{
            if(err) return done(err)
            return done()
        })   
    })

    test('POST /users/create',(done)=>{
        request(app)
        .post('/users/create')
        .send({
            name:"Alex",
            password:"123",
            email:"teste7@gmail.com"
        })
        .expect(201)
        .expect((res)=>{
            console.log("Resposta do /users/create",res.body)
        })
        .end((err,res)=>{
            if(err) return done(err)
            elementId = res.body.savedUser._id
            return done()
        }) 
    })

    test('PATCH /update/:id',(done)=>{
        request(app)
        .patch(`/users/update/${elementId}`)
        .send({
            email:"alexAtt@gmail.com"
        })
        .expect(200)
        .expect((res)=>{
            console.log("Resposta do /update/:id alterando somente o email",res.body)
        })
        .end((err,res)=>{
            if(err) return done(err)
            return done()
        }) 
    })
    test('PATCH /update/:id',(done)=>{
        request(app)
        .patch(`/users/update/${elementId}`)
        .send({
            name:"Alex Atualizado"
        })
        .expect(200)
        .expect((res)=>{
            console.log("Resposta do /update/:id alterando somente o nome",res.body)
        })
        .end((err,res)=>{
            if(err) return done(err)
            return done()
        }) 
    })

    test('DELETE /delete/:id',(done)=>{
        request(app)
        .delete(`/users/delete/${elementId}`)
        .expect(200)
        .expect((res)=>{
            console.log("Resposta do /delete/:id ",res.body)
        })
        .end((err,res)=>{
            if(err) return done(err)
            return done()
        }) 
    })
    

})