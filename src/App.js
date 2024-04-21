import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const productIndex = cartList.findIndex(item => item.id === product.id)

    if (productIndex !== -1) {
      const updatedCart = [...cartList] // Create a copy of the cart list
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: updatedCart[productIndex].quantity + 1, // Increment the quantity
      }

      // Update the state with the new cart list
      this.setState({cartList: updatedCart})
    }
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const productIndex = cartList.findIndex(item => item.id === product.id)

    if (productIndex !== -1) {
      if (cartList[productIndex].quantity === 1) {
        this.removeCartItem(product.id)
      } else {
        const updatedCart = [...cartList] // Create a copy of the cart list
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity - 1, // Increment the quantity
        }

        // Update the state with the new cart list
        this.setState({cartList: updatedCart})
      }
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const foundItem = cartList.find(item => item.id === product.id)
    if (foundItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product)
      //   TODO: Update the code here to implement addCartItem
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCart})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
