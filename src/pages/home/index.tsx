import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { ColumnDisplay } from './ColumnDisplay';
import { fetchMovie, fetchTvShows } from './query';
import { useQuery } from '@tanstack/react-query';

export enum DisplayType {
    Movies = 'movies',
    TvShows = 'tvShows'
}

const Home: React.FC = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(() => {
        const savedDisplayType = localStorage.getItem('displayType');
        return savedDisplayType ? (savedDisplayType as DisplayType) : DisplayType.Movies;
    });

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({ queryKey: ['movies'], queryFn: fetchMovie });
    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({ queryKey: ['tvshows'], queryFn: fetchTvShows });

    useEffect(() => {
        localStorage.setItem('displayType', displayType);
    }, [displayType]);

    return (
        <div>
            <Button.Group style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Button type={displayType === DisplayType.Movies ? "primary" : "default"} onClick={() => setDisplayType(DisplayType.Movies)}>Movies</Button>
                <Button type={displayType === DisplayType.TvShows ? "primary" : "default"} onClick={() => setDisplayType(DisplayType.TvShows)}>TvShows</Button>
            </Button.Group>

            {isLoadingMovies || isLoadingTvShows ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div style={{ margin: 20, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    {displayType === DisplayType.Movies ? (
                        <ColumnDisplay data={movieData.results} displayType={displayType} />
                    ) : (
                        <ColumnDisplay data={tvShowData.results} displayType={displayType} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;