import { useState } from 'react'
import BookCard from '../books/BookCard'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { Book } from '../../utils/types';

const categories = ['Choose a ganre', 'Business', 'Fiction', 'Horror', 'Adventure']

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Choose a ganre')

  const {data} = useFetchAllBooksQuery([])
  let filteredBooks = []

  if(data) filteredBooks = selectedCategory === 'Choose a ganre' ? data.books : data.books.filter((book: Book) => book.category === selectedCategory.toLowerCase())

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
      <div>
        <select name='category' id='category' className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
        onChange={(e) => setSelectedCategory(e.target.value)}>
          {
            categories.map((category , i) => <option value={category} key={i}>{category}</option>)
          }
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        // loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 ? filteredBooks.map((book: Book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book}/>
            </SwiperSlide>
        )) : <p>There are currently no books</p>}
      </Swiper>
    </div>
  )
}

export default TopSellers