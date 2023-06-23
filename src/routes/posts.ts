import { Router } from "express";
import controllerPost from '../controller/posts';

const router = Router();



router.get('/posts', controllerPost.getPosts);
router.get('/post/:id', controllerPost.getPostByID);
router.post('/post', controllerPost.createPost);
router.put('/post/:id', controllerPost.updatePost);
router.delete('/post/:id', controllerPost.deletePost);

router.patch('/post/:id', controllerPost.patchPost);
router.get('/postsFilter', controllerPost.filterPosts);

export default router;
