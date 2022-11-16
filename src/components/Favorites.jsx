import React, { Component } from 'react';
import { movies } from './getMovies';
import { MdOutlineDelete } from 'react-icons/md'
import { AiTwotoneStar } from 'react-icons/ai'
import { WiStars } from 'react-icons/wi'

const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

export class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
        }
    }

    render() {
        const movie = movies.results;
        let temp = [];
        movie.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]]))
                temp.push(genreids[movieObj.genre_ids[0]]);
        })

        return (
            <div className='px-3 sm:px-4 md:px-5 mt-7 flex flex-col items-center md:flex-row md:items-start pb-7 '>

                {/* select genres */}
                <ul className='w-72 ring-2 ring-inset ring-indigo-100/75 rounded-md overflow-hidden font-semibold'>
                    <li className='bg-indigo-600 text-white px-3 py-2'>All Genres</li>
                    {
                        temp.map(genre => (
                            <li
                            key={genre}
                                className='text-indigo-600 px-2 py-1.5 border-y  border-indigo-100 hover:bg-indigo-50 active:bg-indigo-50 cursor-pointer'>{genre}</li>
                        ))
                    }
                </ul>


                <div className='w-full  md:ml-5  lg:mr-5 lg:ml-20 mt-10 md:mt-0 '>
                    {/* search */}
                    <div className='flex space-x-1.5'>
                        <input type="text" name="" id="" placeholder='Search'
                            className='flex-grow outline-none flex-shrink w-20 bg-transparent border-2 border-gray-300 focus:border-gray-400 py-1 pl-2 rounded-md '
                        />
                        <input type="number" name="" id="" placeholder='Rating'
                            className='flex-grow outline-none flex-shrink w-20 bg-transparent border-2 border-gray-300 focus:border-gray-400 py-1 pl-2 rounded-md '
                        />
                    </div>
                    {/* favorites table  */}
                    <table className='mt-1 text-center '>
                        <tbody className='text-xs xs:text-sm sm:text-base'>


                            {/* headings  */}
                            <tr className='border-b border-black '>
                                <th className='py-2 w-full' align='left'>Title</th>
                                <th className='px-3 xs:px-5 xl:px-7'>Genre</th>
                                <th className='px-3 xs:px-5 xl:px-7'>Popularity</th>
                                <th className='px-3 xs:px-5 xl:px-7'>Rating</th>
                                <th className='px-3 xs:px-5 xl:px-7'></th>
                            </tr>

                            {/* main body  */}
                            {movie.map(({ original_title, genre_ids, popularity, id, vote_average, backdrop_path }) => (
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
                                            className='flex items-center cursor-pointer  space-x-2 bg-rose-500 active:bg-rose-700 hover:bg-rose-600 select-none  py-1 mt-1 text-white px-2 rounded-md shadow-md hover:shadow-rose-200 shadow-gray-100'>
                                            <span>Delete</span>
                                            <MdOutlineDelete
                                                className='text-white hidden sm:inline'
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default Favorites