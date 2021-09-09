const RentBill = require('../models/rentBillModel');
const moment = require('moment');
const Product = require('../models/productModel');
const RentCart = require('../models/rentCartModel');
//...........................SHOW PRODUCT IN RENT BILL......................
exports.get_rentbill = (req, res) => { 
    RentBill.find({ user: req.user._id }).populate("product").exec(function (err, rentbills) {
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
   console.log(req.body.data)
    const myPromise = new Promise((resolve, reject) => {
        req.body.data.map((val) => {
            let data = {
                product : val.productid,
                user : req.user._id,
                quantity : val.quantity,
                rent_date : Date.now(),
                return_date : val.returnDate,
                days_rented : val.rentDays,
                total_price : val.subtotal,
                due_remaining : val.subtotal,
                status : "pending"
            }
            RentCart.findOneAndDelete({product : val.productid, user: req.user._id}).then(function() {

                RentBill.create(data).then(function (rentbill) {
                    resolve()
                }).catch(err => {
                    reject()
                })
            }).catch(err => {
                reject()
            })

        })
      });
      
    
      myPromise
      .then(() => {
        return res.status(200).json({
            success: true,
            message: "Product Added to Bill Successfully!!", 
        })
      });

  
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