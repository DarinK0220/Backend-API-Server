"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new client_1.PrismaClient();
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({});
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
const getPostByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ error: 'post not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, body, } = req.body;
    try {
        const post = yield prisma.post.create({
            data: {
                userId,
                title,
                body,
            },
        });
        res.status(200).json(post);
    }
    catch (error) {
        // Handle any errors that occur during user creation
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    const { userId, title, body } = req.body;
    try {
        const updatedpost = yield prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                userId,
                title,
                body
            },
        });
        res.status(200).json(updatedpost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
const patchPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    const { userId, title, body } = req.body;
    try {
        const updatedPost = yield prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                userId: userId,
                title: title,
                body: body,
            },
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    try {
        const deletedPost = yield prisma.post.delete({
            where: {
                id: postId,
            },
        });
        res.status(200).json({ message: 'delete post successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});
const filterPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        //if value suppose to be int type
        if (filter.userId) {
            const intValue = { userId: parseInt(filter.userId) };
            const posts = yield prisma.post.findMany({
                where: intValue,
            });
            if (posts.length > 0) {
                res.status(200).json(posts);
            }
            else {
                res.status(404).json({ error: 'No posts found' });
            }
        }
        else {
            const posts = yield prisma.post.findMany({
                where: filter,
            });
            if (posts.length > 0) {
                res.status(200).json(posts);
            }
            else {
                res.status(404).json({ error: 'No posts found' });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});
exports.default = {
    getPosts,
    createPost,
    updatePost,
    patchPost,
    deletePost,
    getPostByID,
    filterPosts,
};
