import React, { Component } from 'react';
import { MdOutlineDelete } from 'react-icons/md'
import { AiTwotoneStar } from 'react-icons/ai'
import { WiStars } from 'react-icons/wi'
import { FaSortDown } from 'react-icons/fa'
import { FaSortUp } from 'react-icons/fa'


const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

export class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currText: '',
            popularity: null,
            rating: null,
        }
    }

    componentDidMount() {
        const localData = JSON.parse(localStorage.getItem('movies') || '[]');

        let temp = [];

        localData.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]]))
                temp.push(genreids[movieObj.genre_ids[0]]);
        });
        temp.unshift('All Genres')
        this.setState({
            genres: [...temp],
            movies: [...localData]
        })
    }

    handleGenreChange(genre) {
        this.setState({
            currgen: genre
        })
    }


    sortByPopularity = () => {
        this.setState({
            rating: null
        })
        let temp = this.state.movies;
        this.setState({
            popularity: !this.state.popularity
        }, () => {
            temp.sort((objA, objB) => {
                if (this.state.popularity === false)
                    return objB.popularity - objA.popularity;

                else if (this.state.popularity === true)
                    return objA.popularity - objB.popularity;

            });
            this.setState({
                movies: [...temp]
            })
        })
    }

    sortByRating = () => {
        this.setState({
            popularity: null
        })
        let temp = this.state.movies;
        this.setState({
            rating: !this.state.rating
        }, () => {
            temp.sort((objA, objB) => {
                if (this.state.rating === false)
                    return objB.vote_average - objA.vote_average;

                else if (this.state.rating === true)
                    return objA.vote_average - objB.vote_average;

            });
            this.setState({
                movies: [...temp]
            })
        })
    }

    deleteFavorite = (movieObj) => {
        let localData = JSON.parse(localStorage.getItem('movies') || '[]');
        localData = localData.filter(m => {
            return m.id != movieObj.id
        })

        this.setState({
            movies: [...localData]
        });

        localStorage.setItem('movies', JSON.stringify(localData));
    }


    render() {

        let filterArr = [];

        if (this.state.currText === '')
            filterArr = this.state.movies
        else {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                let searchText = this.state.currText.toLowerCase().trim();
                return title.includes(searchText)
            })
        }

        if (this.state.currgen !== 'All Genres')
            filterArr = filterArr.filter(movieObj => genreids[movieObj.genre_ids[0]] === this.state.currgen)


        return (
            <div
                className='px-3 sm:px-4 md:px-5 mt-7 flex flex-col items-center md:flex-row md:items-start pb-7 '>

                {/* select genres */}
                <ul className='w-72 ring-2 ring-inset ring-indigo-100/75 rounded-md overflow-hidden font-semibold'>
                    {/* <li className='bg-indigo-600 text-white px-3 py-2 ring-2 '>All Genres</li> */}
                    {
                        this.state.genres.map(genre => (
                            <li
                                key={genre}
                                onClick={() => { this.setState({ currgen: genre }) }}
                                className={` px-2 py-1.5  cursor-pointer  ${this.state.currgen === genre ? 'text-white bg-indigo-500 rounded-sm' : 'text-indigo-600 border-y border-indigo-100 hover:bg-indigo-50 active:bg-indigo-50'}`}>{genre}</li>
                        ))
                    }
                </ul>


                <div className='w-full  md:ml-5  lg:mr-5 lg:ml-20 mt-10 md:mt-0 '>
                    {/* search */}
                    <div className='flex space-x-1.5'>
                        <input
                            value={this.state.currText}
                            onChange={(e) => { this.setState({ currText: e.target.value }) }}
                            type="text" name="" id="" placeholder='Search'
                            className='flex-grow outline-none flex-shrink w-20 bg-transparent border-2 border-gray-300 focus:border-gray-400 py-1 pl-2 rounded-md '
                        />
                    </div>
                    {/* favorites table  */}
                    <table className='mt-1 text-center '>
                        <tbody className='text-xs xs:text-sm sm:text-base'>


                            {/* headings  */}
                            <tr className='border-b-2 border-gray-300/75 select-none'>
                                <th className='cursor-pointer py-2 w-full' align='left'>Title</th>
                                <th className='cursor-pointer px-3 xs:px-5 xl:px-7'>Genre</th>
                                <th
                                    onClick={this.sortByPopularity}
                                    className='cursor-pointer px-3 xs:px-5 xl:px-7'>
                                    <div className='flex items-center space-x-0.5 '>
                                        <span>Popularity</span>
                                        <div className='flex flex-col justify-center text-gray-700'>
                                            <FaSortUp className={`text-lg translate-y-1.5  ${this.state.popularity === true ? 'text-sky-500' : ''}`} />
                                            <FaSortDown className={`text-lg -translate-y-1.5  ${this.state.popularity === false ? 'text-sky-500' : ''}`} />
                                        </div>
                                    </div>
                                </th>
                                <th
                                    onClick={this.sortByRating}
                                    className='cursor-pointer px-3 xs:px-5 xl:px-7'>
                                    <div className='flex items-center space-x-0.5 '>
                                        <span>Rating</span>
                                        <div className='flex flex-col justify-center text-gray-700'>
                                            <FaSortUp className={`text-lg translate-y-1.5  ${this.state.rating === true ? 'text-sky-500' : ''}`} />
                                            <FaSortDown className={`text-lg -translate-y-1.5  ${this.state.rating === false ? 'text-sky-500' : ''}`} />
                                        </div>
                                    </div>
                                </th>
                                <th className='cursor-pointer px-3 xs:px-5 xl:px-7'></th>
                            </tr>

                            {/* main body  */}
                            {filterArr.map((movieObj) => {
                                const { original_title, genre_ids, popularity, id, vote_average, backdrop_path } = movieObj;
                                return (
                                    <tr
                                        key={id}
                                        className='border-b border-gray-200 '>
                                        <td className='py-2 text-left font-semibold flex flex-col lg:flex-row lg:space-x-2 lg:items-center'>
                                            <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt=""
                                                className='w-16 xs:w-20 lg:w-28 rounded-md'
                                            />
                                            <h3 className=''> {original_title}</h3>
                                        </td>
                                        <td>{genreids[genre_ids[0]]}</td>
                                        <td>
                                            <div className='flex items-center space-x-0.5 justify-center'>
                                                <WiStars className='text-orange-500 text-xl' />
                                                <span>
                                                    {popularity}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-center  '>
                                            <div className='grid place-items-center'>
                                                <div className='flex items-center space-x-0.5'>
                                                    <span>
                                                        {vote_average}
                                                    </span>
                                                    <AiTwotoneStar className='my-auto text-amber-400' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='grid py-3 my-auto place-items-center'>
                                            <div
                                                onClick={() => { this.deleteFavorite(movieObj) }}
                                                className='flex items-center cursor-pointer  space-x-2 bg-rose-500 active:bg-rose-700 hover:bg-rose-600 select-none  py-1 mt-1 text-white px-2 rounded-md shadow-md hover:shadow-rose-200 shadow-gray-100'>
                                                <span>Delete</span>
                                                <MdOutlineDelete
                                                    className='text-white hidden sm:inline'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            )}

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default Favorites