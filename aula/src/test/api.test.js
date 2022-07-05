const request = require("supertest"); // a const chama request pq o supertest permite a requisição; o supertest usa o jest pra fazer os testes
const app = require("../app"); // importamos o app.js porque lá temos a const app = express() que armazena o express, e usamos esse app para fazer a conexão do servidor e aqui ele tem a mesma responsabilidade

// jest.setTimeout(30500);

let elementId; //pra fazer update e delete precisamos do id

describe("API test", () => {  //agrupa vários testes
    // testar primeiro a rota GET

    test("GET /users/all", (done) => {
         request(app) // conexão acontece
            .get("/users/all") //teste fazer um GET, é a requisição
            .expect(200) // Uma função que diz o que esperamos que aconteça, espero que o status seja 200 e não 500, validação do status code
            .expect((res)=>{
                // console.log("body da resposta", res.body); // mostra no terminal todos os usuarios cadastrados no banco
                expect(res.body.length).not.toBe(0) //Aqui dentro é lógica de js

            })
            .end((err, res) => {
                if(err) return done(err) // se o if tem um único retorno o uso de chaves é facultativo
                return done();
            });
    });

    test("POST /users/create", (done) => {
        request(app)
            .post("/users/create")
            .expect("Content-Type", /json/)
            .send({     // Como faziamos no post, no raw, json
                name: "Paula",
                email: "paula@email",
                password: "senhamuitodificl"
            })
            .expect(201)
            .end((err, res) => {
                // console.log("body da resposta", res.body) //os consoles são pra gente ver a res.body mudando
                if(err) return done(err); // se o if tem um único retorno o uso de chaves é facultativo
                // console.log("id do usuário recem-criado", res.body.savedUser._id)
                elementId = res.body.savedUser._id;
                // console.log("variavel de id preenchida", elementId)
                return done();
            });

    });

    test("PATCH /users/update/:id", (done) => {
        request(app)
            .patch(`/users/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Paula Atualizado",
                email: "paulaatualizado@gmail.com"
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.savedUser._id).toBe(elementId);
                expect(res.body.savedUser.name).toBe("Paula Atualizado");
                expect(res.body.savedUser.email).toBe("paulaatualizado@gmail.com");
            })
            .end((err, res) => {
                if(err) return done(err); 
                return done();
            });
    })

    // test("DELETE /users/delete", (done) => {
    //     request(app)
    //         .delete("/users/delete")
    //         .expect()
    
    //         .end((err, res) => {
    //             if(err) return done(err)
    //             return done();
    //         });
    // })


});



/*
Funções JEST

describe() - agrupa um conjunto de testes individuais
Recebe dois parâmetros, o nome dos testes e uma função anônima

test() ou it() - fazem a mesma coisa, realizam um teste individual, vamos usar o test na aula por ser mais semântico
// primeiro parâmetro é o endpoint: o verbo e a rota, precisa da barra antes, precisa da rota raíz e da rota do verbo
o done ali é quando o teste acaba
*/