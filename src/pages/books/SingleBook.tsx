import { useParams } from "react-router-dom"
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi"
import { getBookImgUrl } from "../../utils/getImgUrl"
import { FiShoppingCart } from "react-icons/fi"
import { Book } from "../../utils/types"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { useAppDispatch } from "../../redux/hooks"

const SingleBook = () => {

  const { id } = useParams()
  const {data, isLoading, isError} = useFetchBookByIdQuery(id)
  const book = data ? data.book : ""

  const dispatch = useAppDispatch()

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart(book))
  }

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>There was an error trying to load the book. Please refresh the page</div>

  return (
    <div className="max-w-lg shadow-md p-5">
    <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

    <div className=''>
        <div>
            <img
                src={ data ? `${getBookImgUrl(book.coverImage)}` : ""}
                alt={book.title}
                className="mb-8"
            />
        </div>

        <div className='mb-5'>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
            <p className="text-gray-700 mb-4">
                <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
                <strong>Category:</strong> {book?.category}
            </p>
            <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
        </div>

        <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>

        </button>
    </div>
</div>
  )
}

export default SingleBook