const Product=require('../models/productModel');


//.........................INSERT PRODUCT.........................................................................
exports.add_product=(req,res)=>{
    console.log(req.file)
    const productname=req.body.productname;
    const platform=req.body.platform;
    const rent_price=req.body.rent_price;
    const buy_price=req.body.buy_price;
    const publisher=req.body.publisher;
    const genre=req.body.genre;
    const release_date=req.body.release_date;
    const added_date=req.body.added_date;
    const condition=req.body.condition;
    const system_requirements=req.body.system_requirements;
    const instock=req.body.instock;
    const description=req.body.description;

    const productData= new Product({
        productname:productname,
        platform:platform,
        rent_price:rent_price,
        buy_price:buy_price,
        publisher:publisher,
        image:req.file.path,
        screenshots:req.file.path,
        genre:genre,
        release_date:release_date,
        added_date:added_date,
        condition:condition,
        system_requirements:system_requirements,
        instock:instock,
        description:description,
    })
    productData.save()
    .then(function(success){
        res.status(200).json({success:true,message:"Product Added Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................................UPDATE PRODUCT.................................................
exports.update_product=(req,res)=>{
    const productname=req.body.productname;
    const platform=req.body.platform;
    const rent_price=req.body.rent_price;
    const buy_price=req.body.buy_price;
    const publisher=req.body.publisher;
    const genre=req.body.genre;
    const release_date=req.body.release_date;
    const added_date=req.body.added_date;
    const condition=req.body.condition;
    const system_requirements=req.body.system_requirements;
    const instock=req.body.instock;
    const description=req.body.description;
    const image=req.file.path;
    const pid=req.params.id;

    Product.updateOne({_id:pid},{
        productname:productname,
        platform:platform,
        rent_price:rent_price,
        buy_price:buy_price,
        publisher:publisher,
        genre:genre,
        release_date:release_date,
        added_date:added_date,
        condition:condition,
        system_requirements:system_requirements,
        instock:instock,
        description:description,
        image:image
    })
    .then(function(success){
        res.status(200).json({success:true, message:"Updated Successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

//.....................................DELETE PRODUCT................................................................
exports.delete_product=(req,res)=>{
    const productId= req.params.id;
    Product.deleteOne({_id:productId})
    .then(function(success){
        res.status(200).json({success:true, message:"Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
}

router.get('/product/show', function(req,res){
    Product.find()
    .then(function(data){
        res.json({
            success:true,
            data:data
        })
    })

})

//..................................GET ALL PRODUCTS.......................................................
exports.get_all_products=(req,res)=>{
    Product.find()
    .then(function(data){
        res.json({
            success:true,
            data:data
        })
    })
}
//........................................GET CATEGORY.............................................................
exports.get_category=(req,res)=>{
    var category=req.params.category;
    if(category==="All"){
        Product.find()
        .then(function(data){
            console.log(data)
            res.json({
                success:true,
                data:data
            })
        })
    }else{
        Product.find({genre:category})
        .then(function(data){
            console.log(data)
            res.json({
                success:true,
                data:data
            })
        })
    }  
}

// //for platform
// exports.get_all_products=(req,res)=>{
//     var category=req.params.category;
//     if(category==="All"){
//         Product.find()
//         .then(function(data){
//             console.log(data)
//             res.json({
//                 success:true,
//                 data:data
//             })
//         })
//     }else{
//         Product.find({platform:category})
//         .then(function(data){
//             console.log(data)
//             res.json({
//                 success:true,
//                 data:data
//             })
//         })
//     }  
// }

//......................................GET SINGLE PRODUCT..........................................................

exports.get_single_product=(req,res)=>{
    const productId=req.params.id;
    Product.findOne({_id:productId})
    .then(function(productData){
        res.status(200).json({productData, success: true})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })  
}



