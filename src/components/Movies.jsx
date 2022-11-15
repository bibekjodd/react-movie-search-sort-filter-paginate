import React, { Component } from 'react'
import { movies } from './getMovies'


export class Movies extends Component {
  render() {
    const movie = movies.results;
    console.log(movie)
    return (
      <>
        {movie.length === 0 ?
          <img
            src={spinner}
            alt=""
            className='w-10 aspect-square mx-auto my-10' />
          :
          <div className='bg-gray-50 px-3 '>
            <h3 className='text-center font-semibold text-3xl mt-5 mb-2'>Trending</h3>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-5'>
              {
                movie.map(({ id, backdrop_path, original_title, overview, adult }) => (
                  <div key={id}
                    className='m-2 bg-white rounded-sm relative group cursor-pointer'
                  >
                    {adult && <div className='text-white z-10 grid place-items-center bg-red-500 absolute -top-1.5 -right-1.5 rounded-full aspect-square p-0.5 sm:p-1'>
                      <span>18+</span>
                    </div>}
                    <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt=""
                      className='rounded-sm group-hover:brightness-105' />
                    <h1 className='font-semibold text-lg absolute px-2 top-2  ml-2 text-white bg-black/20 rounded-md'>{original_title}</h1>
                    {/* <p className='line-clamp-2'>{overview}</p> */}
                    <button className='absolute hidden group-hover:block  bottom-3 text-sm xs:text-base text-white font-semibold bg-sky-500 hover:bg-sky-600 active:bg-sky-700  rounded-md px-3 py-1 left-1/2 -translate-x-1/2 '>Add to Favorites</button>
                  </div>
                ))
              }
            </div>
            <nav className='flex justify-center my-4'>
              <button className='border text-sky-500 px-2 py-1'>Previous</button>
              <button className='border text-sky-500 px-2 py-1'>1</button>
              <button className='border text-sky-500 px-2 py-1'>Next</button>
            </nav>
          </div>
        }
      </>
    )
  }
}

export default Movies