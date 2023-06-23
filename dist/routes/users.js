"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controller/users"));
const router = (0, express_1.Router)();
router.get('/users', users_1.default.getUsers);
router.get('/user/:id', users_1.default.getUserByID);
router.post('/user', users_1.default.createUser);
router.put('/user/:id', users_1.default.updateUser);
router.delete('/user/:id', users_1.default.deleteUser);
router.patch('/user/:id', users_1.default.patchUser);
router.get('/usersFilter', users_1.default.filterUsers);
router.get('/users/:id/posts', users_1.default.listingNested);
exports.default = router;
