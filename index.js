const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 8080;

//PORTA
app.listen(PORT,()=>{
    console.log("portal 8080 funcionando");
});

app.use(bodyParser.urlencoded({extended:false}));

//DB CONNECTION
db.authenticate().then(()=> {
    console.log("conectou ao banco");
})
.catch(err=>{
    console.log(`ocorreu um erro: ${err}`);
})

//ROUTES
// app.get("/",function(req,res){
//     res.send("ola2");
// });

//jobs routes
app.use("/jobs", require("./routes/jobs"));


