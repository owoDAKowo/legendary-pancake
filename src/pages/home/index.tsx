import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { fetchData } from './query';
import { useQuery } from '@tanstack/react-query';
import { ColumnDisplay, DisplayType } from '../../components/ColumnDisplay';

const Home: React.FC = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(() => {
        const savedDisplayType = localStorage.getItem('homeDisplayType');
        return savedDisplayType ? (savedDisplayType as DisplayType) : DisplayType.Movies;
    });

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ['moviesHome'],
        queryFn: () => fetchData('movie')
    });

    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
        queryKey: ['tvShowsHome'],
        queryFn: () => fetchData('tv')
    });

    useEffect(() => {
        localStorage.setItem('homeDisplayType', displayType);
    }, [displayType]);

    const handleDisplayTypeChange = (type: DisplayType) => {
        setDisplayType(type);
    };
    
    return (
        <div>
            <Button.Group style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Button type={displayType === DisplayType.Movies ? 'primary' : 'default'} onClick={() => handleDisplayTypeChange(DisplayType.Movies)}>Movies</Button>
                <Button type={displayType === DisplayType.TvShows ? 'primary' : 'default'} onClick={() => handleDisplayTypeChange(DisplayType.TvShows)}>TvShows</Button>
            </Button.Group>
            <div style={{ margin: 20, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <ColumnDisplay data={displayType === DisplayType.Movies ? movieData?.results : tvShowData?.results} displayType={displayType} isLoading={displayType === DisplayType.Movies ? isLoadingMovies : isLoadingTvShows}/>
            </div>
        </div>
    );
};

export default Home;