import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProductDetail from './screens/ProductDetail'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Shipping from './screens/Shipping'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'
import Order from './screens/Order'
import AdminListUsers from './screens/AdminListUsers'
import AdminUserEdit from './screens/AdminUserEdit'
import AdminListProducts from './screens/AdminListProducts'
import AdminProductEdit from './screens/AdminProductEdit'
import AdminListOrders from './screens/AdminListOrders'



const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path='/' component={Home} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/product/:id' component={ProductDetail} />
                    <Route path='/cart/:id?' component={Cart} />
                    <Route path='/shipping' component={Shipping} />
                    <Route path='/payment' component={Payment} />
                    <Route path='/placeorder' component={PlaceOrder} />
                    <Route path='/orders/:id' component={Order} />
                    <Route path='/admin/userlist' component={AdminListUsers} />
                    <Route path='/admin/user/:id/edit' component={AdminUserEdit} />
                    <Route path='/admin/productlist' component={AdminListProducts} />
                    <Route path='/admin/product/:id/edit' component={AdminProductEdit} />
                    <Route path='/admin/orderlist' component={AdminListOrders} />

                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
