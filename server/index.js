const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();

const FoodModel = require("./models/Food");

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost/food",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Successfully connected to the Students Database')

})
.catch(err=>{
    console.log('Unsuccessful to connect with database')
    process.exit
})

app.post ("/insert",async(req,res)=>{
    const foodname=req.body.foodname;
    const daysSinceIAte=req.body.daysSinceIAte;
    const taste=req.body.taste;

    const food=new FoodModel({foodname:foodname,daysSinceIAte:daysSinceIAte,taste:taste})

    try{
        await food.save();

    }catch(err){
        console.log(err);
    }
});

app.get("/read",(req,res)=>{
    FoodModel.find({},(err,result)=>{
        if(err) res.send(err);

        res.send(result);
    });
});

app.put("/update",async(req,res)=>{
    const newfoodname=req.body.newfoodname;
    const newdays=req.body.newdays;
    const newtaste=req.body.newtaste;
    const id=req.body.id;

    try{
        await FoodModel.findById(id,(err, updatedfoodname, updateddays,updatedtaste)=>{
        updatedfoodname.foodname=newfoodname;
        
        updatedays.save();
        updatedfoodname.save();
        updatedtaste.save();
        res.send('Updated.')
        })
    }
    catch(err){
        console.log(err);
    }
});

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;

    await (await FoodModel.findByIdAndRemove(id));
    res.send('Deleted.');
});

app.listen(3001, ()=>{
console.log('Server is running at port 3001');

});