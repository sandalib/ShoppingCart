import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'San',
            email:'admin@example.com',
            password:bcrypt.hashSync('12345'),
            isAdmin:true,
        },
        {
            name:'Red',
            email:'user@example.com',
            password:bcrypt.hashSync('12345'),
            isAdmin:false,
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirt',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            description: 'high quality shirt',
        },
        {
            name: 'Adidas Slim Shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirt',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 20,
            brand: 'Adidas',
            description: 'high quality product',
        },{
            name: 'Nike Fit Pants',
            slug: 'nike-fit-pants',
            category: 'Pants',
            image: '/images/p3.jpg',
            price: 55,
            countInStock: 15,
            brand: 'Nike',
            description: 'high quality product',
        }, {
            name: 'Adidas Fit Pants',
            slug: 'adidas-fit-pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 0,
            brand: 'Adidas',
            description: 'high quality product',
        }    
    ]
};
export default data;