const Promocode = require('../models/promocodeModel');


//.........................INSERT PROMOCODE.........................................................................
exports.add_promocode=(req,res)=>{
    const code=req.body.code;
    const percent=req.body.percent;
    const active=req.body.active;
    const promocodeData= new Promocode({
        code:code,
        percent:percent,
        active:active,
    })
    promocodeData.save()
    .then(function(success){
        res.status(200).json({success:true,message:"Promocode Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................................UPDATE PROMOCODE.................................................
exports.update_promocode=(req,res)=>{
    const active=req.body.active;
    const pid=req.params.id;
    Promocode.updateOne({_id:pid},{
        active:active,
    })
    .then(function(success){
        res.status(200).json({success:true, message:"Updated Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................DELETE PROMOCODE................................................................
exports.delete_promocode=(req,res)=>{
    const promocodeId= req.params.id;
    Promocode.deleteOne({_id:promocodeId})
    .then(function(success){
        res.status(200).json({success:true, message:"Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//........................................GET ALL PROMOCODES.............................................................
exports.get_all_promocode=(req,res)=>{
    Promocode.find()
    .then(function(promocodedata){
        res.send({promocodedata,success: true});
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
}

//......................................GET SINGLE PROMOCODE..........................................................

exports.get_single_promocode=(req,res)=>{
    const promocodeId=req.params.id;
    Promocode.findOne({_id:promocodeId})
    .then(function(promocodeData){
        res.status(200).json({promocodeData, success: true})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })  
}


//......................................CHECK PROMOCODE..........................................................

exports.promocode_check=(req, res) =>{
    const code = req.body.code;
    console.log(code)
    Promocode.findOne({ code: code })
        .then(function (promocodeData) {
            if (promocodeData === null) {
                return res.status(201).json({success: false, 
                    message: "Invalid Code!!" })
            }
            if (promocodeData.active){
                console.log(promocodeData)
                return res.status(200).json({
                    success: true,
                    message: 'code success!!',
                    percent:promocodeData.percent,
                    data:promocodeData
                })
            }
            else if(!promocodeData.active){
                console.log(promocodeData)
                return res.status(201).json({success: false, message: "Code Expired!!" })
            }  
            })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}