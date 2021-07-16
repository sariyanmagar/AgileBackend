const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
           console.log(file.originalname)
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
     
        //to provide unique filename
        cb(null, Date.now()+file.originalname) 
    }
})

const fileFilter=function(req, file, cb){
    if(file.mimetype=='images/jpg' || file.mimetype=='images/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
// path define garne--storage
const uploadimage=multer({
    storage:storage,
    // fileFilter:fileFilter
    });

module.exports=uploadimage;