import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc     Fetch all products
// @route    Get /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc     Fetch single product
// @route    Get /api/product/:id
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Delete a product
// @route    DELETE /api/product/:id
// @access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove();
        res.json({ message: "Product removed" })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Create a product
// @route    POST /api/product/:id
// @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc     Update a product
// @route    PUT /api/product/:id
// @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description
        product.image = req.body.image
        product.brand = req.body.brand
        product.category = req.body.category
        product.countInStock = req.body.countInStock

        const updatedProduct = await product.save()

        res.json(updatedProduct)
    } else {
        res.status(401)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}