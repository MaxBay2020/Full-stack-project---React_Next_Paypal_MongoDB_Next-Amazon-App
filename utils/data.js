import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Cong',
            email: 'wangxiaobei666@hotmail.com',
            password: bcrypt.hashSync('123'),
            isAdmin: true
        },
        {
            name: 'Max',
            email: '123@123.com',
            password: bcrypt.hashSync('abc'),
            isAdmin: false
        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpeg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpeg',
            price: 80,
            brand: 'Adidas',
            rating: 4.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpeg',
            price: 70,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpeg',
            price: 90,
            brand: 'Oliver',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'Smart looking pants'
        },
        {
            name: 'Fit Pants',
            slug:'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpeg',
            price: 95,
            brand: 'Zara',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pants'
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpeg',
            price: 75,
            brand: 'Casely',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pants'
        },
    ]
}

export default  data
