
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const getUsers = async (req: Request, res: Response) => {
    try{
      const users = await prisma.user.findMany({
        include: {
          address: {
            include: {
              geo: true, // Include the geo field in the returned address object
            },
          },
          company: true
        },
      })
      return res.status(200).json(users);    
  
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
};
  
  
  
  
  
  
  
  
const createUser = async (req: Request, res: Response) => {
    try {
      const { name, username, email, address, phone, website, company } = req.body;
  
      const result = await prisma.user.create({
        data: {
          name: name,
          username: username,
          email: email,
          address: {
            create: {
              street: address.street,
              suite: address.suite,
              city: address.city,
              zipcode: address.zipcode,
              geo: {
                create: {
                  lat: address.geo.lat,
                  lng: address.geo.lng,
                },
              },
            },
          },
          phone: phone,
          website: website,
          company: {
            create: {
              name: company.name,
              catchPhrase: company.catchPhrase,
              bs: company.bs,
            },
          },
        },
        include: {
          address: {
            include: {
              geo: true, // Include the geo field in the returned address object
            },
          },
          company: true
        },
      });
  
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  
  
  
  
  
  
const updateUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, username, email, address, phone, website, company } = req.body;
  
      const result = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          username: username,
          email: email,
          address: {
            upsert: {
              create: {
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: {
                  create: {
                    lat: address.geo.lat,
                    lng: address.geo.lng,
                  },
                },
              },
              update: {
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: {
                  update: {
                    lat: address.geo.lat,
                    lng: address.geo.lng,
                  },
                },
              },
            },
          },
          phone: phone,
          website: website,
          company: {
            upsert: {
              create: {
                name: company.name,
                catchPhrase: company.catchPhrase,
                bs: company.bs,
              },
              update: {
                name: company.name,
                catchPhrase: company.catchPhrase,
                bs: company.bs,
              },
            },
          },
        },
        include: {
          address: {
            include: {
              geo: true,
            },
          },
          company: true,
        },
      });
  
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  
  
  
  
const patchUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, username, email, address, phone, website, company } = req.body;

        const result = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: name,
            username: username,
            email: email,
            address: {
            upsert: {
                create: {
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: {
                    create: {
                    lat: address.geo.lat,
                    lng: address.geo.lng,
                    },
                },
                },
                update: {
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: {
                    update: {
                    lat: address.geo.lat,
                    lng: address.geo.lng,
                    },
                },
                },
            },
            },
            phone: phone,
            website: website,
            company: {
            upsert: {
                create: {
                name: company.name,
                catchPhrase: company.catchPhrase,
                bs: company.bs,
                },
                update: {
                name: company.name,
                catchPhrase: company.catchPhrase,
                bs: company.bs,
                },
            },
            },
        },
        include: {
            address: {
            include: {
                geo: true,
            },
            },
            company: true,
        },
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  
  
const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
  
  
      const geoAddress = await prisma.geo.delete({
        where: {
          id: userId,
        },
      });
        
      const resultAddress = await prisma.address.delete({
        where: {
          id: userId,
        },
      });
  
      const resultCompany = await prisma.company.delete({
        where: {
          id: userId,
        },
      });
      const resultPost = await prisma.post.deleteMany({
        where: {
          userId: userId,
        },
      });
      const result = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
  
  
      return res.status(200).json({message: 'delete user successfully'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  
  
  
  
const getUserByID = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
  
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          address: {
            include: {
              geo: true,
            },
          },
          company: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  
  
  
  
  
const filterUsers = async (req: Request, res: Response) => {
    try {
      const filter = req.query;
      //if value suppose to be int type
      if (filter.id) {
        const intValue: Record<string, number> = { id: parseInt(filter.id as string) };
        const users = await prisma.user.findMany({
          where: intValue,
          include: {
            address: {
              include: {
                geo: true,
              },
            },
            company: true,
          },
        });
  
        if (users.length > 0) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'No users found' });
        }
      }else{
        const users = await prisma.user.findMany({
          where: filter,
          include: {
            address: {
              include: {
                geo: true,
              },
            },
            company: true,
          },
        });
  
        if (users.length > 0) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'No users found' });
        }
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
  







const listingNested =  async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const results = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'No result found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve resources' });
  }
};



export default {
    getUsers,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    getUserByID,
    filterUsers, 
    listingNested
};
