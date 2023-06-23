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
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: {
                address: {
                    include: {
                        geo: true, // Include the geo field in the returned address object
                    },
                },
                company: true
            },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, address, phone, website, company } = req.body;
        const result = yield prisma.user.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const { name, username, email, address, phone, website, company } = req.body;
        const result = yield prisma.user.update({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const { name, username, email, address, phone, website, company } = req.body;
        const result = yield prisma.user.update({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const geoAddress = yield prisma.geo.delete({
            where: {
                id: userId,
            },
        });
        const resultAddress = yield prisma.address.delete({
            where: {
                id: userId,
            },
        });
        const resultCompany = yield prisma.company.delete({
            where: {
                id: userId,
            },
        });
        const resultPost = yield prisma.post.deleteMany({
            where: {
                userId: userId,
            },
        });
        const result = yield prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return res.status(200).json({ message: 'delete user successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const user = yield prisma.user.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const filterUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        //if value suppose to be int type
        if (filter.id) {
            const intValue = { id: parseInt(filter.id) };
            const users = yield prisma.user.findMany({
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
            }
            else {
                res.status(404).json({ error: 'No users found' });
            }
        }
        else {
            const users = yield prisma.user.findMany({
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
            }
            else {
                res.status(404).json({ error: 'No users found' });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
const listingNested = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const results = yield prisma.post.findMany({
            where: {
                userId: id,
            },
        });
        if (results.length > 0) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json({ error: 'No result found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve resources' });
    }
});
exports.default = {
    getUsers,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    getUserByID,
    filterUsers,
    listingNested
};
