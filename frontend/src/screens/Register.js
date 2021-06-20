import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions.js'

const Register = ({ location, history }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, phone, email, password))
        }

    }

    return (
        <FormContainer>
            <h3>Sign Up</h3>
            {message && <span><Message variant="danger">{message}</Message></span>}
            {error && <span><Message variant="danger">{error}</Message></span>}
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
                        Sign Up
                    </Button>
                </div>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?   <Link className="text-decoration-none" style={{ color: "green" }}
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
