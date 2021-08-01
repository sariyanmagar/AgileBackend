const RentBill=require('../models/rentBillModel');
const moment = require('moment');
//...........................SHOW PRODUCT IN RENT BILL......................
exports.get_rentbill=(req,res)=>{
    console.log(req.user)
    RentBill.find({user:req.user._id}).populate("product").exec(function(err, rentbills){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Cart Bill",
            data:rentbills
        })
    })
}

//..............................DELETE ...............................
// exports.delete_rentbill=(req,res)=>{
//     RentBill.findOneAndDelete({user:req.user._id, product:req.params.id}, function(err,rentbills){
//         if(err){
//             return res.status(500).json({
//                 success:false,
//                 message:err.message
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             message:"Item removed from the rent bill!!",
//             data:rentbills
//         })
//     })
// }

//...........................ADD TO RENT BILL............................................
exports.add_to_rentbill=(req,res)=>{
    console.log(req.user._id)
    var data={
        product:req.body.productId,
        user:req.user._id,
        advance:200,
        rent_date: moment(new Date()),
        return_date: null,
        days_rented: null,
        calc_price: 0,
        total_price:0
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
            RentBill.create(data).then(function(rentbill){
                return res.status(200).json({
                    success:true,
                    message:"Product Added to Bill Successfully!!",
                    rentbill:rentbill
                })
            }).catch(err =>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        // }
    // })
}