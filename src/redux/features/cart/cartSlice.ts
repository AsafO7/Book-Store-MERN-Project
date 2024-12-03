import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import { Book } from '../../../utils/types'


// Define a type for the slice state
interface CartState {
  cartItems: Book[]
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      // Was the book added to the cart?
      const existingItem = state.cartItems.find(item => item._id === action.payload._id)
      if(!existingItem) {
        state.cartItems.push(action.payload)
        alert("Item was Added Successfully")
      }
      else {
        alert("Item already in Cart")
      }
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      state.cartItems = state.cartItems.filter(book => book._id !== action.payload._id)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer