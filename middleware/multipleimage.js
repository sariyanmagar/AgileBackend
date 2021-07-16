const multer=require("multer");

const multerstorage=multer.memoryStorage();

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb("Please upload images only!!", false);
    }
}

const upload=multer({
    storage:multerstorage,
    fileFilter:multiFilter
})

const uploadFiles=upload.array("images", 10);

const uploadImages=(req,res,next)=>{
    uploadFiles(req,res,err=>{
        if(err instanceof multer.MulterError) //error occured while uploading
    {
        if (err.code==="LIMIT_UNEXPECTED_FILE"){

        }

    }else if (err){

    }
    next();
    })
}
module.exports=uploadImages;
