const Platform=require('../models/platformModel');

//.........................INSERT PLATFORM...................................................................
exports.add_platform=(req,res)=>{
    const platform_name=req.body.platform_name;

    const platformData= new Platform({
        platform_name:platform_name,
    })
    platformData.save()
    .then(function(success){
        res.status(200).json({message:"Platform Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//....................UPDATE PLATFORM.............................................................................
 exports.update_platform=(req,res)=>{
     const platform_form=req.body.platform_name
     const platformid=req.params.id;
     Platform.updateOne({_id:platformid},{
         platform_name:platform_name
    })
    .then(function(success){
        res.status(200).json({message:"Updated Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//........................GET ALL PLATFORMS.............................................................................
exports.get_all_platforms=(req,res)=>{
    Platform.find()
    .then(function(platformData){
        res.send(platformData);
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
}

//......................................GET SINGLE PRODUCT..........................................................

exports.get_single_platform=(req,res)=>{
    const platformId=req.params.id;
    Platform.findOne({_id:platformId})
    .then(function(platformData){
        res.status(200).json(platformData)
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })  
}