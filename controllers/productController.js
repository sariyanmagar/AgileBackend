const { WebPushError } = require('web-push');
const Product=require('../models/productModel');
const rating=require('../models/ratingModel');



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
    const trailer=req.body.trailer;

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
        trailer:trailer
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
    const trailer=req.body.trailer;
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
        trailer:trailer,
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

//..................................GET ALL PRODUCTS...............................................................
exports.get_all_products = (req, res) => {
    const sortType = req.params.sortType
    var sortElem
    if (sortType == "asc") {
        sortElem = { productname: 1 }
    }
    else if (sortType == "des") {
        sortElem = { productname: -1 }
    }
    else if (sortType == "high") {
        sortElem = { buy_price: -1 }
    }
    else if (sortType == "low") {
        sortElem = { buy_price: 1 }
    }
    Product.find().sort(sortElem)
        .then(function (data) {
            res.json({
                success: true,
                data: data
            })
        })
}
//........................................GET PRODUCT CATEGORY.............................................................
exports.get_genre=(req,res)=>{
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

//for platform
exports.get_platform=(req,res)=>{
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
        Product.find({platform:category})
        .then(function(data){
            console.log(data)
            res.json({
                success:true,
                data:data
            })
        })
    }  
}

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
//.......................RATE PRODUCTS.....................................................
exports.rateProducts=(req,res)=>{
    rating.findOne({userid : req.user._id, productid : req.body.productid}, function(err, checkrating){
        if(err) return res.send({
            success : false,
            message : err.message
        })

        if(!checkrating) {
            rating.create({
                userid : req.user._id,
                productid : req.body.productid,
                ratings : req.body.ratings
            }, function(err, ratings){
                if (err) return res.send({
                    success : false,
                    message : err.message
                })
    
              
    
                return res.send({
                    success : true,
                    // message : "Venue Rated",
                    ratings: ratings
    
                })
            })
        }else{

            rating.findByIdAndUpdate(checkrating._id, {rating : req.body.rating}, function(err, ratingdata){
               
                if(err) return res.send({
                    success : false,
                    message : err.message
                })

               rating.findById(ratingdata._id, function(err, ratings){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                return res.send({
                    success : true,
                    ratings : ratings
                })
               })
            })
        }

    })   
}
//.......................................AVERAGE RATING.........................................................
exports.getAvgRating=(req,res)=>{
    rating.find({productid : req.body.productid}, function(err, data){
        if(err) return res.send({
            success:false,
            message : err.message
        })
        var sum = 0;
         data.forEach(value => {
             sum  = parseInt(sum) + parseInt(value.ratings); 
           });
           var avg = sum / data.length;
        return res.send({
            success : true,
            averageRating : avg
        })

    })
}

//........................................SEARCHING..........................................................





