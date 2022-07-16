require("dotenv").config;

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const errors = require("../messages/errors");
const env = process.env;

exports.viewUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                permissions: true
            }
        });
        
        const count = await prisma.user.count({});

        res.status(200).send({ payload: users, count: count });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


exports.addNewUser = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            username,
            email,
            password, 
            passwordSecond, 
            status
        } = req.body;

        if (password !== passwordSecond) {
            error = {
                code: "202",
                message: errors.authentication.registration.passwordNotMatching
            }
            throw error;
        }

        const hashedPass = await bcrypt.hash(password, parseInt(env.SALT_ROUNDS));

        const dataToInput = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPass,
            status: status
        };

        user = await prisma.user.create({ data: dataToInput });

        res.status(200).send({
            payload: user
        });

    } catch (error) {
        if (error.code === 'P2002') {
            res.status(500).send({
                error: errors.authentication.registration.userExists
            });
        }


        res.status(500).send({error: error.message});
    }
}

exports.editUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const { 
                firstName,
                lastName,
                email, 
                status
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        fieldsFromInput = {
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            status: status
        };
        
        Object.keys(fieldsFromInput).forEach(key => {
            if (fieldsFromInput[key] === '') {
                delete fieldsFromInput[key]
            }
        })

        const updatedUser = await prisma.user.update({
            data: fieldsFromInput,
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).send({ payload: updatedUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).send({ payload: deleteUser });
    } catch (error) {
        res.status(500).send({ error: errors.authentication.delete.deleteFailed });
    }
}

exports.searchBy = async (req, res) => {
    try {
        const searchBy = req.params.searchBy;
        const searchTerm = req.params.searchTerm;

        switch (searchBy) {
            case "firstName":
                var users = await prisma.user.findMany({
                    where: {
                        firstName: {
                            contains: searchTerm
                        }
                    }
                });
                break;
            case "lastName":
                var users = await prisma.user.findMany({
                    where: {
                        lastName: {
                            contains: searchTerm
                        }
                    }
                });                  
                break;
            case "username":
                var users = await prisma.user.findMany({
                    where: {
                        username: {
                            contains: searchTerm
                        }
                    }
                });                  
                break;
            case "status":
                var users = await prisma.user.findMany({
                    where: {
                        status: {
                            contains: searchTerm
                        }
                    }
                });                  
                break;
            case "email":
                var users = await prisma.user.findMany({
                    where: {
                        email: {
                            contains: searchTerm
                        }
                    }
                });                  
                break;
            default: 
                res.status(200).send({payload: null})
        }
        res.status(200).send({payload: users});
    } catch (err) {
        res.status(500).send({err: err.message});
    }
}