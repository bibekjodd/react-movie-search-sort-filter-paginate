import React, { Component } from 'react'
import spinner from '../spinner.png'
import axios from 'axios';
import Banner from './Banner';

export class Movies extends Component {
  constructor() {
    super();
    this.state = {
      currPage: 1,
      movies: [],
      loading: false,
      totalPages: 0,
      favorites: []
    }
  }

  async getMovies() {
    this.setState({
      loading: true
    })
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1c4234ef14fac29971f16cbc7f291e00&language=en-US&page=${this.state.currPage}`)
    this.setState({
      movies: [...res.data.results],
      loading: false,
      totalPages: res.data.total_pages >= 500 ? 500 : res.data.total_pages,
      // totalPages: 10
    });
    this.handleFavoriteState();
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
    }, this.getMovies)
  }


  addToFavorites(movieObj) {
    let localData = JSON.parse(localStorage.getItem('movies') || '[]');
    // console.log(movieObj.id)
    // console.log(localData[0].id)
    if (this.state.favorites.includes(movieObj.id)) {
      localData = localData.filter((m) => {
        console.log(m.id)
        return (m.id != movieObj.id)
      })
    }
    else {
      localData.push(movieObj)
    }
    localStorage.setItem('movies', JSON.stringify(localData));
    this.handleFavoriteState();
  }

  handleFavoriteState() {
    let localData = JSON.parse(localStorage.getItem('movies') || '[]');
    let temp = localData.map(({ id }) => id);

    this.setState({
      favorites: temp
    });
  }

  render() {
    return (
      <>
        <Banner />
        {this.state.loading && <img
          src={spinner}
          alt=""
          className='w-10 aspect-square mx-auto my-10' />}


        {/* all movies */}
        {!this.state.loading && <div className='bg-gray-50  '>
          <h3 className='text-center font-semibold text-3xl mt-5 mb-2'>Trending</h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-5 md:px-2 bg-gray-100 '>
            {
              this.state.movies.map((movieObj) => {
                const { id, backdrop_path, original_title, overview, adult } = movieObj;
                return (
                  <div key={id}
                    className='my-2 sm:mx-1 md:m-2 bg-white rounded-sm relative group cursor-pointer'
                  >
                    {adult && <div className='text-white z-10 grid place-items-center bg-red-500 absolute -top-1.5 -right-1.5 rounded-full aspect-square p-0.5 sm:p-1'>
                      <span>18+</span>
                    </div>}
                    <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt=""
                      className='rounded-sm group-hover:brightness-105 w-full aspect-video object-cover bg-gray-100' />
                    <h1 className='font-semibold text-lg absolute px-2 top-2  ml-2 text-white bg-black/20 rounded-md'>{original_title}</h1>
                    {/* <p className='line-clamp-2'>{overview}</p> */}
                    <button
                      onClick={() => { this.addToFavorites(movieObj) }}
                      className='absolute hidden group-hover:block  bottom-3 text-sm xs:text-base text-white font-semibold bg-sky-500 hover:bg-sky-600 active:bg-sky-700  rounded-md px-3 py-1 left-1/2 -translate-x-1/2 '>
                      {this.state.favorites.includes(movieObj.id) ? 'Remove from Favorite' : 'Add to Favorites'}</button>
                  </div>
                )
              })
            }


          </div>
          <nav className='flex justify-center my-4'>
            <button
              onClick={this.handleLeft}
              className={`border text-sky-500 px-2 py-1 ${this.state.currPage <= 1 ? 'hidden' : 'inline'}`}>Previous</button>
            <button
              onClick={() => { this.changePage(1) }}
              className={`border text-sky-500 px-2 py-1 ${this.state.totalPages < 1 ? 'hidden' : 'inline'} ${this.state.currPage === 1 ? 'bg-sky-100' : ''}`}>
              1</button>

            <button
              onClick={() => { this.changePage(2) }}
              className={`border text-sky-500 px-2 py-1 ${this.state.totalPages < 2 ? 'hidden' : 'inline'} ${this.state.currPage === 2 ? 'bg-sky-100' : ''}`}>
              2</button>

            <button
              onClick={() => { this.changePage(3) }}
              className={`border text-sky-500 px-2 py-1 ${this.state.totalPages < 3 ? 'hidden' : 'inline'} ${this.state.currPage === 3 ? 'bg-sky-100' : ''}`}>
              3</button>


            {
              this.state.totalPages > 4 && <>
                <button
                  onClick={() => { this.changePage(this.state.totalPages - 1) }}
                  className={`border text-sky-500 px-2 py-1  ${this.state.currPage === this.state.totalPages - 1 ? 'bg-sky-100' : ''}`}>
                  {this.state.totalPages - 1}</button>

                <button
                  onClick={() => { this.changePage(this.state.totalPages) }}
                  className={`border text-sky-500 px-2 py-1  ${this.state.currPage === 500 ? 'bg-sky-100' : ''}`}>
                  {this.state.totalPages}</button>
              </>}



            <button
              onClick={this.handleRight}
              className={`border text-sky-500 px-2 py-1  ${this.state.totalPages === this.state.currPage ? 'hidden' : 'inline'}`}>
              Next</button>

          </nav>
        </div>}
      </>
    )
  }
}

export default Movies