const express=require('express');
const router=express.Router();

const PromocodeController=require('../controllers/promocodeController')

router.post('/add/promocode',PromocodeController.add_promocode);

router.put('/update/promocode/:id',PromocodeController.update_promocode);

router.delete('/deletepromocode/:id', PromocodeController.delete_promocode);

router.get('/getallpromocode', PromocodeController.get_all_promocode);

router.get('/getsinglepromocode/:id',PromocodeController.get_single_promocode);

module.exports=router;