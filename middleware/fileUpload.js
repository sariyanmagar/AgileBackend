// const multer=require('multer');
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/images')
//     },
//     filename:function(req,file,cb){
//         //to provide unique filename
//         cb(null, Date.now()+file.originalname)
//     }
// })

// const fileFilter=function(req,file,cb){
//     if(file.mimetype=='image/jpeg' || file.mimetype=='image/gif'){
//         cb(null,true)
//     }
//     else{
//         cb(null, false)
//     }
// }

// //define tha path
// const upload=multer({
//     storage:storage,
//     fileFilter:fileFilter
// });
// module.exports=upload;