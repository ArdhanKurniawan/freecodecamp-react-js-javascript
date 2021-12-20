import React from 'react';

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// component
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumbnail from './Thumbnail';
import SpinnerLoading from './SpinnerLoading';
import SearchBar from './SearchBar';
import Button from './Button';

// hook
import useHomeFetch from '../hooks/useHomeFetch';

//image
import NoImage from '../images/no_image.jpg';

const Home = () => {

    const {State, Loading, Error, searchTerm, setSearchTerm, setIsLoadingMore} = useHomeFetch();
    console.log(State);
    if (Error) {return <div>Something wrong ....</div> ;}

    return (
        <>
            {!searchTerm && State.results[0] ? (
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${State.results[0].backdrop_path}`}
                title={State.results[0].title}
                text={State.results[0].overview}
                />
            ) : null
            }

            <SearchBar setSearchTerm={setSearchTerm} />

            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                {/* "movies" from url api */}
                {State.results.map(movie => (
                    <Thumbnail
                        key = {movie.id}
                        clickable
                        image = {
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId = {movie.id}
                    />
                ))}
            </Grid>

            {Loading && <SpinnerLoading />}

            {State.page < State.total_pages && !Loading && (
                <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
            )}
        </>
    );
};

export default Home;