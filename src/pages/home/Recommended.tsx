// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Book } from '../../utils/types';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommended = () => {

  const {data} = useFetchAllBooksQuery([])

  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>
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
        {data && data.books.length > 0 ? data.books.slice(8, 18).map((book: Book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book}/>
            </SwiperSlide>
        )) : <p>There are currently no books</p>}
      </Swiper>
    </div>
  )
}

export default Recommended