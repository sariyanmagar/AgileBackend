const Publisher = require('../models/publisherModel');

//.........................INSERT PLATFORM...................................................................
exports.add_publisher=(req,res)=>{
    const publisher_name=req.body.publisher_name;
    const publisherData= new Publisher({
        publisher_name:publisher_name,
    })
    publisherData.save()
    .then(function(success){
        res.status(200).json({success:true,message:"Publisher name Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//....................UPDATE PLATFORM.............................................................................
 exports.update_publisher=(req,res)=>{
     const publisher_name=req.body.platform_name
     const publisherid=req.params.id;
     Publisher.updateOne({_id:publisherid},{
         publisher_name:publisher_name
    })
    .then(function(success){
        res.status(200).json({success:true,message:"Updated Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//........................GET ALL PLATFORMS.............................................................................
exports.get_all_publishers=(req,res)=>{
    Publisher.find()
    .then(function(publisherData){
        res.send(publisherData);
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
}

//......................................GET SINGLE PLATFORM..........................................................
exports.get_single_publisher=(req,res)=>{
    const publisherid=req.params.id;
    publisherData.findOne({_id:publisherid})
    .then(function(publisherData){
        res.status(200).json(publisherData)
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })  
}

//.....................................DELETE PLATFORM................................................................
exports.delete_publisher=(req,res)=>{
    const publisherid= req.params.id;
    Publisher.deleteOne({_id:publisherid})
    .then(function(success){
        res.status(200).json({success:true,message:"Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}