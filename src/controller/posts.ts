
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient()






const getPosts = async (req: Request, res: Response) => {
  try{
    const posts = await prisma.post.findMany({})
    return res.status(200).json(posts);    


  } catch (error: any) {
    return res.status(500).json(error.message);
  }
  
};




const getPostByID =  async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};




const createPost =  async (req: Request, res: Response) => {
  const { userId,title,body, } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        userId,
        title,
        body,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};





const updatePost =  async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { userId,title,body } = req.body;

  try {
    const updatedpost = await prisma.post.update({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};


const patchPost =  async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { userId, title, body } = req.body;

  try {
    const updatedPost = await prisma.post.update({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};




const deletePost =  async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).json({ message:'delete post successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};





const filterPosts =  async (req: Request, res: Response) => {
  try {
    const filter = req.query;
    //if value suppose to be int type
    if (filter.userId) {
      const intValue: Record<string, number> = { userId: parseInt(filter.userId as string) };
      const posts = await prisma.post.findMany({
        where: intValue,
      });

      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: 'No posts found' });
      }
    }else{
      const posts = await prisma.post.findMany({
        where: filter,
      });

      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: 'No posts found' });
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};





  

export default {
    getPosts,
    createPost,
    updatePost,
    patchPost,
    deletePost,
    getPostByID,
    filterPosts, 
};
