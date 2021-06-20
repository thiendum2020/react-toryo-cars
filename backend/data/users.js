import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@toryo.com',
        phone: '0123456789',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
    },
    {
        name: 'Toryo',
        email: 'toryo@toryo.com',
        phone: '0987654321',
        password: bcrypt.hashSync('123', 10),
    },
    {
        name: 'User',
        email: 'user@toryo.com',
        phone: '0123456789',
        password: bcrypt.hashSync('123', 10),
    },
]

export default users