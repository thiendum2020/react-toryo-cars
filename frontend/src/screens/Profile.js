import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { getMyListOrder } from '../actions/orderActions'


const Profile = ({ history }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(getMyListOrder())
            } else {
                setName(user.name)
                setPhone(user.phone)
                setEmail(user.email)

            }
        }


    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({ id: user._id, name, phone, email, password }))
        }
    }

    return (
        <Row>
            <Col md={4}>
                <h4>User Profile</h4>
                {message && <span><Message variant="danger">{message}</Message></span>}
                {error && <span><Message variant="danger">{error}</Message></span>}
                {success && <span><Message variant="success">Profile Updated</Message></span>}
                {loading && <h5><Loader /></h5>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="phone" style={{ marginTop: "8px" }}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginTop: "8px" }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginTop: "8px" }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" style={{ marginTop: "8px" }}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                        <Button
                            type="submit"
                            variant="primary">
                            Update
                        </Button>
                    </div>
                </Form>
            </Col>
            <Col md={8}>
                <h4>My Orders</h4>
                {loadingOrders ? <Loader /> : errorOrders ? <span><Message variant="danger">{errorOrders}</Message></span> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th style={{ textAlign: "center" }}>PAID</th>
                                <th style={{ textAlign: "center" }}>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td class="align-middle">{order._id}</td>
                                    <td class="align-middle">{order.createdAt.substring(0, 10)}</td>
                                    <td class="align-middle">{order.totalPrice}</td>
                                    <td class="align-middle" style={{ textAlign: "center" }} >{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}</td>
                                    <td class="align-middle" style={{ textAlign: "center" }}>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}</td>
                                    <td class="align-middle">
                                        <LinkContainer to={`/orders/${order._id}`} className="text-decoration-none">
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default Profile
