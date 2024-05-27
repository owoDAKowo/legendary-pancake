import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { fetchRated } from './query';
import { useQuery } from '@tanstack/react-query';
import { ColumnDisplay, DisplayType } from '../../components/ColumnDisplay';
import { Navigate } from 'react-router-dom';

const Rated: React.FC = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(() => {
        const savedDisplayType = localStorage.getItem('ratedDisplayType');
        return savedDisplayType ? (savedDisplayType as DisplayType) : DisplayType.Movies;
    });

    const { data: movieData, isLoading: isLoadingMovies, error: movieError } = useQuery({
        queryKey: ['moviesRated'],
        queryFn: () => fetchRated('movies')
    });

    const { data: tvShowData, isLoading: isLoadingTvShows, error: tvShowError } = useQuery({
        queryKey: ['tvShowsRated'],
        queryFn: () => fetchRated('tv')
    });

    useEffect(() => {
        localStorage.setItem('ratedDisplayType', displayType);
    }, [displayType]);

    const handleDisplayTypeChange = (type: DisplayType) => {
        setDisplayType(type);
    };
    
    if(!localStorage.getItem('guest_session_id')){
        return <Navigate to='/auth' />
    };

    return (
        <div>
            <Button.Group style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Button type={displayType === DisplayType.Movies ? 'primary' : 'default'} onClick={() => handleDisplayTypeChange(DisplayType.Movies)}>Movies</Button>
                <Button type={displayType === DisplayType.TvShows ? 'primary' : 'default'} onClick={() => handleDisplayTypeChange(DisplayType.TvShows)}>TvShows</Button>
            </Button.Group>
            {
            movieError && displayType === DisplayType.Movies ? (
                <>Нету фильмов</>
            ) : tvShowError && displayType === DisplayType.TvShows ? (
                <>Нету сериалов</>
            ) : (
                <div style={{ margin: 20, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <ColumnDisplay data={displayType === DisplayType.Movies ? movieData?.results : tvShowData?.results} 
                    displayType={displayType} 
                    isLoading={displayType === DisplayType.Movies ? isLoadingMovies : isLoadingTvShows}
                    isRated={true}
                    />
                </div>
            )}
        </div>
    );
};

export default Rated;