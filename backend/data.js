import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'San',
            email: 'admin@example.com',
            password: bcrypt.hashSync('12345'),
            isAdmin: true,
        },
        {
            name: 'Red',
            email: 'user@example.com',
            password: bcrypt.hashSync('12345'),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Maroon Party Dress',
            slug: 'maroon-party-dress',
            category: 'Dress',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'BrandName',
            description: 'high quality product',
        },
        {
            name: 'Pink Party Dress',
            slug: 'pink-party-dress',
            category: 'Dress',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 20,
            brand: 'BrandName',
            description: 'high quality product',
        }, {
            name: 'Purple Party Dress',
            slug: 'purple-party-dress',
            category: 'Long Dress',
            image: '/images/p3.jpg',
            price: 55,
            countInStock: 15,
            brand: 'BrandName',
            description: 'high quality product',
        }, {
            name: 'Off Shoulder Dress',
            slug: 'off-shoulder-dress',
            category: 'Dress',
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 0,
            brand: 'BrandName',
            description: 'high quality product',
        }
    ]
};
export default data;