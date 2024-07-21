import app from "./src/main.js";

const porta = 3000

app.listen(porta, ()=>{
    console.log(`API rodando: http//localhost${porta}`)
})