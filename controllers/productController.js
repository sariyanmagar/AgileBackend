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
    const imagepath=req.file.path;// image
    const screenshotpath=req.file.path;// Screenshots
    const genre=req.body.genre;
    const release_date=req.body.release_date;
    const system_requirements=req.body.system_requirements;
    const instock=req.body.instock;
    const description=req.body.description;
    const trailerpath=req.file.path; //trailer
    const comment=req.body.comment;
    const rating=req.body.rating;

    const productData= new productname({
        productname:productname,
        platform:platform,
        price:price,
        publisher:publisher,
        image:"/images/" +req.file.filename,
        screenshots:"/images/" + req.file.filename,
        genre:genre,
        release_date:release_date,
        system_requirements:system_requirements,
        instock:instock,
        description:description,
        trailer:"/images/" + req.file.filename,
        comment:comment,
        rating:rating
    })
    productData.save()
    .then(function(success){
        res.status(200).json({message:"Product Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}



