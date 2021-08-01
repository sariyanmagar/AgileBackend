const RentBill = require('../models/rentBillModel');
const moment = require('moment');
const Product = require('../models/productModel');
//...........................SHOW PRODUCT IN RENT BILL......................
exports.get_rentbill = (req, res) => {
    console.log(req.user)
    RentBill.find({ user: req.user._id }).populate("products").exec(function (err, rentbills) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart Bill",
            data: rentbills
        })
    })
}

//..............................DELETE ...............................
exports.delete_rentbill = (req, res) => {
    RentBill.findOneAndDelete({ user: req.user._id, product: req.params.id }, function (err, rentbills) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Item removed from the rent bill!!",
            data: rentbills
        })
    })
}

//...........................ADD TO RENT BILL............................................
exports.add_to_rentbill = async (req, res) => {
    // console.log(req.user._id)
    var total_rent_price = 0
    // console.log("products", req.body.products)
    await Promise.all(req.body.products.map(async productId => {
        const product = await Product.findById(productId)
        total_rent_price += product.rent_price
    }))
    var return_date = req.body.return_date
    var days_rented = moment.duration(moment(new Date(return_date)).diff(moment())).days()
    var total_price = total_rent_price * days_rented
    var data = {
        products: req.body.products,
        user: req.user._id,
        advance: 500,
        return_date: return_date,
        total_price: total_price,
        days_rented: days_rented,
        due_remaining: total_price - 500
        // return_date: null,
        // days_rented: 0,
        // calc_price: 0,
        // total_price:0
        // return_date: moment(new Date()),
        // days_rented : moment.duration(rent_date.diff(return_date)),
        // calc_price : days_rented * req.body.rent_price,
        // total_price : advance + calc_price
    }
    // RentBill.findOne(data,function(err, rentbill){
    // if(rentbill){
    //     var currentquantity=rentbill.quantity+1;
    //     RentBill.findOneAndUpdate({_id:rentcart._id}, {$set:{quantity:currentquantity}}).then(function(rentbill){
    //         return res.status(200).json({
    //             success:true,
    //             message:"Product added to rent bill successfully!!",
    //             rentbill:rentbill
    //         })
    //     }).catch(err =>{
    //         return res.status(500).json({
    //             success:false,
    //             message:err.message
    //         })
    //     })
    // }else{
    RentBill.create(data).then(function (rentbill) {
        return res.status(200).json({
            success: true,
            message: "Product Added to Bill Successfully!!",
            rentbill: rentbill
        })
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    })
    // }
    // })
}


//...........................UPDATE RENT BILL............................................
exports.update_rentbill = async (req, res) => {
    var total_rent_price = 0
    await Promise.all(req.body.products.map(async productId => {
        const product = await Product.findById(productId)
        total_rent_price += product.rent_price
    }))
    var return_date = req.body.return_date
    var days_rented = moment.duration(moment(new Date(return_date)).diff(moment())).days()
    var total_price = total_rent_price * days_rented
    var totalPaid = req.body.advance
    var due_remaining = total_price - totalPaid
    var returned = (due_remaining == 0 ? true : false)

    var data = {
        advance: totalPaid,
        return_date: return_date,
        days_rented: days_rented,
        total_price: total_price,
        due_remaining: due_remaining,
        returned: returned
    }

    console.log(data)

    RentBill.findByIdAndUpdate(req.params.id,
        data,
        (err, success) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            return res.status(200).json({ success: true, message: "Updated Successfully!!" })
        }
    )
}