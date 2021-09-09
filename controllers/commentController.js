const comment=require('../models/commentModel'); 
const User=require('../models/userModel')

exports.addComments=(req,res)=>{
    console.log(req.body)
        comment.create({
            userid : req.user._id,
            productid : req.body.productid,
            comment : req.body.comment

        }, function(err, commentdata){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            comment.find({productid : req.body.productid}).populate("userid replies.id").exec(function(err, data){

                User.populate(data, {
                    path: 'replies.id.userid',
                    
                  }, function(err, data){
                    return res.json({
                        success : true,
                        comments : data
                    });
                  });
            })
        })
}

exports.getCommentByProduct=(req,res)=>{
    comment.find({productid : req.body.productid}, function(err, comments){
        if(err) return res.send({
            success : false,
            message : err.message
        })
            if(!comments) return res.send({
                success : false,
                message : "No Comments"
            })

        comment.find({productid : req.body.productid}).populate("userid").exec(function(err, data){

            return res.json({
                success : true,
                comments : data
            });
        })
    })
}

exports.destroyComment=(req,res)=>{
    comment.findOneAndDelete({_id : req.body.commentId}, function(err, comments){
 
        comment.find({productid : req.body.productid}, function(err, comments){
            if(err) return res.send({
                success : false,
                message : err.message
            })
                if(!comments) return res.send({
                    success : false,
                    message : "No Comments"
                })

                comment.find({productid : req.body.productid}).populate("userid replies.id").exec(function(err, data){

                    User.populate(data, {
                        path: 'replies.id.userid',
                        
                      }, function(err, data){
                        return res.json({
                            success : true,
                            comments : data
                        });
                      });
                })
        })
    })

}

 