import React, { Component } from 'react'
import spinner from '../spinner.png'
import axios from 'axios';

export class Movies extends Component {
  constructor() {
    super();
    this.state = {
      currPage: 1,
      movies: [],
      loading: false
    }
  }

  async getMovies() {
    this.setState({
      loading: true
    })
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1c4234ef14fac29971f16cbc7f291e00&language=en-US&page=${this.state.currPage}`)
    this.setState({
      movies: [...res.data.results],
      loading: false
    });
  }

  componentDidMount() {
    this.getMovies();
  }

  handleLeft = () => {
    if (this.state.currPage <= 1)
      return;
    this.setState({
      currPage: this.state.currPage - 1
    }, this.getMovies)
  }

  handleRight = () => {
    this.setState({
      currPage: this.state.currPage + 1
    }, this.getMovies)
  }

  changePage = (value) => {
    this.setState({
      currPage: value
    },this.getMovies)
  }

  render() {
    return (
      <>
        {this.state.loading && <img
          src={spinner}
          alt=""
          className='w-10 aspect-square mx-auto my-10' />}
        {!this.state.loading && <div className='bg-gray-50 px-3 '>
          <h3 className='text-center font-semibold text-3xl mt-5 mb-2'>Trending</h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-5'>
            {
              this.state.movies.map(({ id, backdrop_path, original_title, overview, adult }) => (
                <div key={id}
                  className='m-2 bg-white rounded-sm relative group cursor-pointer'
                >
                  {adult && <div className='text-white z-10 grid place-items-center bg-red-500 absolute -top-1.5 -right-1.5 rounded-full aspect-square p-0.5 sm:p-1'>
                    <span>18+</span>
                  </div>}
                  <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt=""
                    className='rounded-sm group-hover:brightness-105 w-full aspect-video object-cover bg-gray-100' />
                  <h1 className='font-semibold text-lg absolute px-2 top-2  ml-2 text-white bg-black/20 rounded-md'>{original_title}</h1>
                  {/* <p className='line-clamp-2'>{overview}</p> */}
                  <button className='absolute hidden group-hover:block  bottom-3 text-sm xs:text-base text-white font-semibold bg-sky-500 hover:bg-sky-600 active:bg-sky-700  rounded-md px-3 py-1 left-1/2 -translate-x-1/2 '>Add to Favorites</button>
                </div>
              ))
            }
          </div>
          <nav className='flex justify-center my-4'>
            <button
              onClick={this.handleLeft}
              className='border text-sky-500 px-2 py-1'>Previous</button>
            <button
            onClick={()=>{this.changePage(1)}}
             className={`border text-sky-500 px-2 py-1 ${this.state.currPage === 1 ? 'bg-sky-100' : ''}`}>1</button>
            <button
            onClick={()=>{this.changePage(2)}}
             className={`border text-sky-500 px-2 py-1 ${this.state.currPage === 2 ? 'bg-sky-100' : ''}`}>2</button>
            <button
            onClick={()=>{this.changePage(3)}}
             className={`border text-sky-500 px-2 py-1 ${this.state.currPage === 3 ? 'bg-sky-100' : ''}`}>3</button>
            <button
              onClick={this.handleRight}
              className='border text-sky-500 px-2 py-1'>Next</button>
          </nav>
        </div>}
      </>
    )
  }
}

export default Movies