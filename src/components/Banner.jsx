import React, { Component } from 'react'
import { movies } from './getMovies';
import spinner from '../spinner.png'

export class Banner extends Component {
  // movie = movies.results[0]
  render() {
    const randValue = Math.floor(Math.random() * movies.results.length);
    const movie = movies.results[randValue];
    return (
      <div className=''>
        {!movie ?
          <img
            src={spinner}
            alt=""
            className='w-10 aspect-square mx-auto my-10' />
          :
          <div className='relative'>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""
              className='h-[70vh] w-full object-cover sm:object-fill' />
            <div className='text-white absolute py-8 bottom-0 bg-black/20  p-nice space-y-2 w-full'>
              <h5 className='text-2xl font-semibold'>{movie.original_title}</h5>
              <p className='line-clamp-2 text-lg '>{movie.overview}</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Banner