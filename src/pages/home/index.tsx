import React, { useState } from 'react';
import { Button } from 'antd';
import { ColumnDisplay } from './ColumnDisplay';
import { fetchMovie, fetchTvShows } from './query';
import { useQuery } from '@tanstack/react-query';

export enum DisplayType {
    Movies = 'movies',
    TvShows = 'tvShows'

}
const Home: React.FC = () => {

    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);
    const { data: movieData, isLoading: isLoadingMovies } = useQuery({ queryKey: ['movies'], queryFn: fetchMovie })
    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({ queryKey: ['tvshows'], queryFn: fetchTvShows })
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div>
                <Button.Group style={{ marginTop: '10px' }}>
                    <Button type={displayType === DisplayType.Movies ? "primary" : "default"} onClick={() => setDisplayType(DisplayType.Movies)}>Movies</Button>
                    <Button type={displayType === DisplayType.TvShows ? "primary" : "default"} onClick={() => setDisplayType(DisplayType.TvShows)}>TvShows</Button>
                </Button.Group>
                {isLoadingMovies || isLoadingTvShows ? <div>Loading...</div> :
                    <div style={{ marginTop: 20 }}>
                        {displayType === DisplayType.Movies ?
                            <ColumnDisplay data={ movieData.results } displayType={ displayType } /> :
                            <ColumnDisplay data={ tvShowData.results } displayType={ displayType } />
                        }
                    </div>}
            </div>
        </div>
    );
};

export default Home;