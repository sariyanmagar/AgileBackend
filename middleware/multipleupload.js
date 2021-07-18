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

var multipleupload=multer({
    storage:storage
}).array('multi-uploads', 5);

module.exports=multipleupload;


    