const express=require('express');
const router=express.Router();

const commentController=require('../controllers/commentController');
const auth=require('../middleware/auth');

router.post('/add/comment', commentController.addComments);
router.post('/get/comments',commentController.getCommentByProduct);
router.delete('delete/comments',auth.verifyUser,commentController.destroyComment);