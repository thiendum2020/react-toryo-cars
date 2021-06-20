import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <Card.Title as='div'>
                        <h5>{product.name}</h5>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                   <Rating 
                        value={product.rating}
                        text={` ${product.numReviews} reviews`}/> 
                </Card.Text>

                <Card.Text as='h4'>${product.price}</Card.Text>

                <Link to={`/product/${product._id}`}>
                    <Button size="sm" variant="outline-primary">View more</Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
}

export default Product
