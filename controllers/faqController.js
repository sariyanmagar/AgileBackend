const Faq=require('../models/faqModel');


//.........................INSERT FAQ.........................................................................
exports.add_faq=(req,res)=>{
    const question=req.body.question;
    const answer=null;
    const answered=false;

    const faqData= new Faq({
        question:question,
        answer:answer,
        answered:answered
    })
    faqData.save()
    .then(function(success){
        res.status(200).json({success:true,message:"Question Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.........................INSERT ADMIN FAQ.........................................................................
exports.add_admin_faq=(req,res)=>{
    const question=req.body.question;
    const answer=req.body.answer;
    const answered=req.body.answered;

    const faqData= new Faq({
        question:question,
        answer:answer,
        answered:answered
    })
    faqData.save()
    .then(function(success){
        res.status(200).json({success:true,message:"FAQ Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................................UPDATE FAQ.................................................
exports.update_faq=(req,res)=>{
    const question=req.body.question;
    const answer=req.body.answer;
    const answered=req.body.answered;
    const pid=req.params.id;

    Faq.updateOne({_id:pid},{
        question:question,
        answer:answer,
        answered:answered
    })
    .then(function(success){
        res.status(200).json({success:true, message:"Updated Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................DELETE FAQ................................................................
exports.delete_faq=(req,res)=>{
    const faqId= req.params.id;
    Faq.deleteOne({_id:faqId})
    .then(function(success){
        res.status(200).json({success:true, message:"Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//..................................GET ALL FAQs...............................................................
exports.get_all_faqs=(req,res)=>{
    Faq.find()
    .then(function(data){
        res.json({
            success:true,
            data:data
        })
    })
}

//........................................GET UNANSWERED FAQ.............................................................
// exports.get_unanswered=(req,res)=>{
//     var answered=req.params.answered;
//     if(answered===true){
//         Faq.find()
//         .then(function(data){
//             console.log(data)
//             res.json({
//                 success:true,
//                 data:data
//             })
//         })
//     }else{
//         Faq.find({answered:false})
//         .then(function(data){
//             console.log(data)
//             res.json({
//                 success:true,
//                 data:data
//             })
//         })
//     }  
// }

//........................................GET UNANSWERED FAQ.............................................................
exports.get_unanswered = (req, res) => {
    Faq.find({ answered: req.params.answered })
        .then(function (data) {
            return res.json({
                success: true,
                data: data
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                error: err
            })
        })
}

//......................................GET SINGLE FAQ..........................................................

exports.get_single_faq=(req,res)=>{
    const faqId=req.params.id;
    Faq.findOne({_id:faqId})
    .then(function(faqData){
        res.status(200).json({faqData, success: true})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })  
}



