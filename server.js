const express=require("express");
const geoCode =require("./utils/geoCode");
const foreCast=require("./utils/foreCast");

const app=express();

app.get("",(req,res)=>{
    res.json({
        title:"Weather Page",
        name:"Weather"
    })
})

app.get("/about",(req,res)=>{
    res.json({
        name:"About",
        title:"About Page"
    })
})

app.get("/help",(req,res)=>{
    res.json({
        title:"Help Page",
        name:"Help"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        res.json({
            error:"You must provide a address"
        })
    }
    else{
        geoCode(req.query.address,(err,data)=>{
            if(err){
                res.json({error:"Cant find that address"})
            }
            else{
                foreCast(data.latitude,data.longitude,data.location,(error,response)=>{
                    if(error){
                        res.json({error})
                    }
                    else{
                        res.json({
                            weather:response.Weather,
                            Temperature:response.Temperature,
                            Location:response.Location
                        })
                    }
                })
            }
            
        })
    }
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        res.json({
            error:"You must provide a search term"
        })
    }
    else{
        res.json({
            products:[]
        })
    }
})


app.get("/help/*",(req,res)=>{
    res.json("404",{
        errmsg:"Help article not found",
        title:"404"
    })
})

app.get("*",(req,res)=>{
    res.json("404",{
        errmsg:"Page not found",
        title:"404"
    })
})

app.listen(5000,()=>{
    console.log("Server Listening and up on 5000")
})

