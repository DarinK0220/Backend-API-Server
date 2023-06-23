"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = __importDefault(require("../controller/posts"));
const router = (0, express_1.Router)();
router.get('/posts', posts_1.default.getPosts);
router.get('/post/:id', posts_1.default.getPostByID);
router.post('/post', posts_1.default.createPost);
router.put('/post/:id', posts_1.default.updatePost);
router.delete('/post/:id', posts_1.default.deletePost);
router.patch('/post/:id', posts_1.default.patchPost);
router.get('/postsFilter', posts_1.default.filterPosts);
exports.default = router;
