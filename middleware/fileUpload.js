const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        //to provide unique filename
        cb(null, Date.now()+file.originalname)
    }
})

const fileFilter=function(req,file,cb){
    if(file.mimetype=='images/jpeg' || file.mimetype=='images/gif' || file.mimetype=='images/png'){
        cb(null,true)
    }
    else{
        cb(null, false)
        const err=new Error('Only .png, .jpeg, gif format allowed');
        err.name='ExtensionError'
        return cb(err);
    }
}

//define tha path
const upload=multer({
    storage:storage,
    fileFilter:fileFilter
});
module.exports=upload;