const { isValidObjectId } = require('mongoose');
const BuyCart = require('../models/buyCartModel');
const Product = require('../models/productModel');
const mongoose = require("mongoose")

//...........................SHOW PRODUCT IN BUY CART......................................................
exports.get_default_buycart = (req, res) => {
    console.log(req.user)
    BuyCart.findOne({ user: req.user._id, status: "default" }).populate({ path: "order.product" }).exec(function (err, buycarts) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart Items",
            data: buycarts
        })
    })
}

exports.get_buycart = (req, res) => {
    console.log(req.user)
    BuyCart.find({ user: req.user._id }).populate({ path: "order.product" }).exec(function (err, buycarts) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart Items",
            data: buycarts
        })
    })
}


//.................................................GET TRENDING........................................................
exports.get_trending = (req, res) => {
    BuyCart.find({}).then(data => { })
    BuyCart.aggregate([
        {
            $group: {
                _id: '$order.product',
                quantity: { "$first": '$order.quantity' }
            }
        }
    ]).then(async data => {
        var productQuantitiy = []
        await data.map((d) => {
            for (var i = 0; i < d._id.length; i++) {
                productQuantitiy.push({
                    product: d._id[i],
                    quantity: d.quantity[i]
                })
            }
        })

        var result = []
        await Promise.all(productQuantitiy.map(products => {
            if ((result.filter(prod => `"${prod.product}"` == `"${products.product}"`)).length > 0) {
                result.forEach((value, key) => {
                    // console.log(value.product, products.product)
                    if (`"${value.product}"` == `"${products.product}"`) {
                        result[key].quantity += products.quantity
                        return
                    }
                });
            }
            else {
                result.push(products)
            }
        }))

        Product.populate(result,{path:"product"}).then(data=>{
            data.sort()
            return res.status(200).json({
                success: true,
                message: "Cart Items",
                data: data
            })
        })
    })
}

// db.sales.aggregate(
//     [
//       {
//         $group:
//           {
//             _id: "$item",
//             avgAmount: { $avg: { $multiply: [ "$price", "$quantity" ] } },
//             avgQuantity: { $avg: "$quantity" }
//           }
//       }
//     ]
//  )
// var trending={}
// BuyCart.find({status:"delivered"}).populate({ path: "order.product" }).exec(async function(err, buycarts) {

// buycarts.map(buycart=>{
//     buycart.order.map(order=>{
//         let product = order.product.productname
//         if(trending.)
//         trending[product]=1
//     })
// })

// buycarts.map(buycart=>{
//     buycart.order.map(order=>{
//         let product = order.product.productname
//         trending.product=1
//     })
// })


//     })
// }

//..............................DELETE .....................................................................
exports.delete_buycart = (req, res) => {
    BuyCart.findOneAndDelete({ user: req.user._id, product: req.params.id }, function (err, buycarts) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Item removed from the buy cart!!",
            data: buycarts
        })
    })
}

//...........................ADD TO BUY CART..................................................................
exports.add_to_buycart = async (req, res) => {
    var user = req.user._id
    await BuyCart.findOne({ user: user, status: "default" }, async (err, buycart) => {
        console.log(buycart)
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if (buycart != null) {
            var product = req.body.productId

            if ((buycart.order.filter(prod => prod.product == product)).length > 0) {
                buycart.order.forEach((value, key) => {
                    if (value.product == product) {
                        buycart.order[key].quantity += 1
                        return
                    }
                });
            } else {
                buycart.order.push({ product: req.body.productId })
            }
            await Product.findById(req.body.productId).then(data => {
                console.log(buycart.grandTotal)
                buycart.grandTotal += data.buy_price
            })
            buycart.save().then(function (buycart) {
                return res.status(200).json({
                    success: true,
                    message: "Product Added to Cart Successfully!!",
                    buycart: buycart
                })
            }).catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            })
        }
        else {
            let order = []
            let grandTotal = 0
            console.log(req.body)
            order.push({ product: req.body.productId })
            await Product.findById(req.body.productId).then(data => {
                console.log(data)
                grandTotal += data.buy_price
            })
            BuyCart.create({ user: user, order: order, grandTotal: grandTotal }).then(function (buycart) {
                return res.status(200).json({
                    success: true,
                    message: "Product Added to Cart Successfully!!",
                    buycart: buycart
                })
            }).catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            })
        }
    })

}


exports.update_buycart_to_pending = async (req, res) => {
    var user = req.user._id
    await BuyCart.findOne({ user: user, status: "default" }, async (err, buycart) => {
        // console.log(buycart)
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if (buycart != null) {
            buycart.status = "pending"
            // buycart.order.push({product:req.body.productId})
            // await Product.findById(req.body.productId).then(data=>{
            //     buycart.grandTotal+=data.buy_price
            // })
            buycart.save().then(function (buycart) {
                return res.status(200).json({
                    success: true,
                    message: "Confirm order successful!!",
                    buycart: buycart
                })
            }).catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            })
        }
    })

}


exports.update_buycart_to_delivered = async (req, res) => {
    var user = req.user._id
    await BuyCart.findOne({ user: user, status: "pending" }, async (err, buycart) => {
        // console.log(buycart)
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if (buycart != null) {
            buycart.status = "delivered"
            // buycart.order.push({product:req.body.productId})
            // await Product.findById(req.body.productId).then(data=>{
            //     buycart.grandTotal+=data.buy_price
            // })
            buycart.save().then(function (buycart) {
                return res.status(200).json({
                    success: true,
                    message: "Confirm order successful!!",
                    buycart: buycart
                })
            }).catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            })
        }
    })

}



// //..........................................................REMOVE FROM BUYCART..............................................................
// exports.remove_buycart = (req,res) =>{
//     var orderId = req.params.id
//     var Ob_id = req.params.Ob_id
//     Buycart.update({ _id: orderId},
//         { 
//             $pull: { "order._id": Ob_id }
//         }
//     );
// }

//.........................................................REMOVE FROM ORDER..............................................................
exports.remove_order = (req,res) =>{
    var orderId = req.params.id
    var Ob_id = req.params.Ob_id
    BuyCart.findOneAndUpdate({ _id: orderId,status: "pending"},
        { 
            $pull: { "order": {_id: Ob_id} }
        }
    ).then(data=>{
        return res.status(200).json({
            success:true,
            message:"success delete"
        })
    });
}
