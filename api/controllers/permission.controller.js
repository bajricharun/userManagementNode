require("dotenv").config;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.viewPermissionsForUser = async (req, res) => {
    try {
        const permissions = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                permissions: true
            }
        });
        

        res.status(200).send({ payload: permissions});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

exports.viewPermissions = async (req, res) => {
    try {
        const permissions = await prisma.permissions.findMany({           
        });

        res.status(200).send({ payload: permissions});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


exports.assignPermission = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const permissionsId = req.body.permissionsId;
    let toRemove = [];
    let toAdd = [];
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                permissions: true
            }
        });

        for (let permissionId of permissionsId) {
            toAdd.push(permissionId)
        }

        for (let permission of user.permissions) {
            toAdd = toAdd.filter(element => {
                if (element !== permission.code) {
                    return element;
                } else {
                    toRemove.push(element);
                }
            });
        }

        const updatedUser = await prisma.user.update({
            data: {
                permissions: {
                    connect: toAdd.map((id) => ({code: id})),
                    disconnect: toRemove.map((id) => ({code: id}))
                }
            }, 
            where: {
                id: userId
            },
            include: {
                permissions: true
            }    
        });

        res.status(200).send({ payload: updatedUser });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }

}

