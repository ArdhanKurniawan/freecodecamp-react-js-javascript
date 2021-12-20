import React from 'react';
import {useParams} from 'react-router-dom';

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from '../config';

// Component
import SpinnerLoading from './SpinnerLoading';
import Grid from './Grid';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actors from './Actors';

// Hook
import {useMovieFetch} from '../hooks/useMovieFetch';

// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    const {movieId} = useParams();
    const {State: Movie, Loading, Error} = useMovieFetch(movieId);
    
    if (Loading) return <SpinnerLoading />
    if (Error) return <div>Something wrong ....</div>

    return (
        <>
            <BreadCrumb movieTitle={Movie.original_title} />
            <MovieInfo movie={Movie} />
            <MovieInfoBar
            time={Movie.runtime} 
            budget={Movie.budget} 
            revenue={Movie.revenue}
            />

            <Grid header='Actors'>

                {/* Movie.actors -> "actors" must to many 's' i don't know why */}
                {/* actor -> that parameter, can type anything */}
                
                {Movie.actors.map(actor => (
                    <Actors 
                        key={actor.credit_id}
                        names={actor.name}
                        characters={actor.character}
                        imageurl={
                            actor.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
};

export default Movie;