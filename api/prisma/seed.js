const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    
    const data = {
        "firstName": "Test",
        "lastName": "User",
        "username": "username",
        "password": "password",
        "status": "employee",
        "email": "testemail@gmail.com"
    }

    const permissionData = {
        "Admin": {
            "code": "100",
            "description": "admin-user"
        },
        "User": {
            "code": "101",
            "description": "user"
        },
        "Can-read": {
            "code": "102",
            "description": "read-only"
        },
        "Can-write": {
            "code": "103",
            "description": "can-write",
        },
        "Can-delete": {
            "code": "104",
            "description": "can-delete"
        }
    };

    for (let i = 0; i < 400; i++) {
        dataToInput = {
            firstName: data.firstName + i,
            lastName: data.lastName + i,
            username: data.username + i,
            password: data.password,
            status: data.status,
            email : i + data.email
        }

        user = await prisma.user.create({ data: dataToInput });
    }

    for (let i in permissionData) {
        permission = await prisma.permissions.create({
            data: {
                code: permissionData[i].code, 
                description: permissionData[i].description
        }})
    }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })