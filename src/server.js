var { graphql, buildSchema } = require("graphql")

var schema = buildSchema(`
    type Query{
        msg: String
    }
`)

var rootValue ={
    msg(){
        return "HELLO WORD"
    }
}

graphql({
    schema,
    source: "{msg}",
    rootValue
}).then(response =>{
    console.log(response)
})