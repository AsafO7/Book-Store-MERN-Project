import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NewsType } from '../../utils/types'
import { getNewsImgUrl } from '../../utils/getImgUrl'


const News = () => {
  const [news, setNews] = useState<NewsType[]>([])

  useEffect(() => {
    fetch('news.json')
      .then((res) => res.json())
        .then((data) => setNews(data))
  },[])

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>News </h2>

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
          }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          news.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                {/* content */}
                <div className='py-4'>
                  <Link to="/">
                        <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                  </Link>
                  <div className='w-12 h-[4px] bg-primary mb-5'></div>
                  <p className='text-sm text-gray-600'>{item.description}</p>
                </div>

                <div className='flex-shrink-0'>
                  <img src={`${getNewsImgUrl(item.coverImage)}`} alt=""  className='w-full object-cover'/>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default News