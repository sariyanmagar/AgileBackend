const Product=require('../models/productModel');
const upload=require('../middleware/fileUpload');

//.........................INSERT PRODUCT...................................................................
exports.add_product=upload.single('image'),(req,res)=>{
    if(req.file==undefined){
        return res.status(400).json({
            message:"Invalid File Format!!"
        })
    }
    const productname=req.body.productname;
    const platform=req.body.platform;
    const price=req.body.price;
    const publisher=req.body.publisher;
    const path=req.file.path;// image
    const path=req.body.path;// Screenshots
    const genre=req.body.genre;
    const release_date=req.body.release_date;
    const system_requirements=req.body.system_requirements;
    const instock=req.body.instock;
    const description=req.body.description;
    const path=req.file.path; //trailer
    const comment=req.body.comment;
    const rating=req.body.rating;
}



