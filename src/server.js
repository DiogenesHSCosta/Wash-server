import Express from "express"
import { buildSchema } from "graphql"
import { graphqlHTTP } from "express-graphql"


const schema = buildSchema(`
    type Query{
        hello: String
    }
`)

const root ={  
    hello: ()=> {   
        return "Hello Word!";
    }
}

const app = Express()

app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

console.log(root)


const port = 4000
app.listen(port, () =>{
    console.log(`API rodando: http://localhost:${port}`)
})