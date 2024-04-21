import CartContext from '../../context/CartContext'

// Write your code here
const CardSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalPrice = 0

      cartList.forEach(element => {
        const eachPrice = element.price * element.quantity
        totalPrice += eachPrice
      })

      return (
        <div>
          <h1>
            Order Total: <span>Rs {totalPrice}/-</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button type="button">CheckOut</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CardSummary
