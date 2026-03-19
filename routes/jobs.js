const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

//detalhe da vaga -> view/1, view/2
router.get("/view/:id",(req,res) => Job.findOne({
    where:{id: req.params.id}
    }).then(job =>{
        console.log(job)
        res.render("view",{
            job,
            extraCSS: '<link rel="stylesheet" href="/css/job-view.css">'
        });

    }).catch(err=>console.log(err))
);

//form da rota de envio
router.get("/add",(req,res)=>{
    res.render("add", {
        extraCSS: '<link rel="stylesheet" href="/css/add.css">'
    });
})

//add
router.post("/add", (req,res)=>{
    let {title, salary, company, description, email, new_job} = req.body;

    //insert retorna um promise
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(()=> res.redirect("/"))
    .catch(err => console.log(err));
});

module.exports = router;