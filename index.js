const express = require("express");
const {engine} = require("express-handlebars")
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const PORT = 3000;

//PORTA
app.listen(PORT,()=>{
    console.log("portal 8080 funcionando");
});

//bodyParser
app.use(bodyParser.urlencoded({extended:false}));

//handle bars
app.set("views", path.join(__dirname, "views"));

app.engine("hbs", engine({extname: ".hbs",defaultLayout: "main",layoutsDir: path.join(__dirname, "views/layouts")}));
app.set("view engine", "hbs");

//static folder
app.use(express.static(path.join(__dirname,'public')));

//DB CONNECTION
db.authenticate().then(()=> {
    console.log("conectou ao banco");
})
.catch(err=>{
    console.log(`ocorreu um erro: ${err}`);
})

//ROUTES
 app.get("/",function(req,res){

    let search = req.query.job;
    let query = '%'+search+'%'; // PH -> busca resultando aproximadamente da palavra chave = PHP;

    if(!search)
    {
        Job.findAll({order:[
            ['createdAt','DESC']
        ]})
        .then(jobs =>{
            res.render("index",{
                jobs
            });
        })
        .catch(err => console.log(err));
    }else{ 
        Job.findAll({
            where: {title:{[Op.like]:query}},
            order:[['createdAt','DESC']
        ]})
        .then(jobs =>{
            res.render("index",{
                jobs, search
            });
        })
        .catch(err=>console.log(err));
    }
    
    
});

//jobs routes determina o nome da req que será utilizada
app.use("/jobs", require("./routes/jobs"));


