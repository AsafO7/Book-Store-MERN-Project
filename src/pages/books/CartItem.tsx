import { Link } from "react-router-dom"
import { removeFromCart } from "../../redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { Book } from "../../utils/types"
import { getBookImgUrl } from "../../utils/getImgUrl"


const CartItem = ({ book }: {book: Book}) => {
  const cartItems = useAppSelector(state => state.cart.cartItems)
  const dispatch = useAppDispatch()

  const handleRemoveFromCart = () => dispatch(removeFromCart(book))

  const getBookQuantity = () => (cartItems.filter(item => item._id === book._id)).length

  return (
    <li  className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt="book-image"
          src={`${getBookImgUrl(book?.coverImage)}`}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to='/'>{book?.title}</Link>
            </h3>
            <p className="sm:ml-4">${book?.newPrice}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category:</strong> {book?.category}</p>
        </div>
        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
          <p className="text-gray-500"><strong>Qty:</strong> {getBookQuantity()}</p>

          <div className="flex">
            <button  type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveFromCart()}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem