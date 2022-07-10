const app = require("./src/app")

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Você consegue! A porta ${PORT} está rodando.`)) 