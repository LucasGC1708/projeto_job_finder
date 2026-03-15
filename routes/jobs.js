const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/teste",(req,res)=>{
    res.send("entrou");
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