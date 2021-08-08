const express=require('express');
const router=express.Router();

const commentController=require('../controllers/commentController');
const auth=require('../middleware/auth');

router.post('/add/comment',auth.verifyUser, commentController.addComments);
router.post('/get/comments',auth.verifyUser,commentController.getCommentByProduct);
router.delete('delete/comments',auth.verifyUser,commentController.destroyComment);
router.post('/addReply',auth.verifyUser,commentController.addReply);

module.exports=router