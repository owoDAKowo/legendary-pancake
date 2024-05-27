import { Card, Col, Row, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export enum DisplayType {
    Movies = 'movies',
    TvShows = 'tvShows'
}

const { Meta } = Card;

interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    release_date: string;
    rating?: number;
}

interface Props {
    data: DisplayData[];
    displayType: DisplayType;
    isLoading: boolean;
    isRated?: boolean;
}

export const ColumnDisplay = ({ data, displayType, isLoading, isRated }: Props) => {
    useEffect(() => {  }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }
    
    return (
        <Row gutter={20} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            {data.map(({ id, title, name, overview, poster_path, vote_average, rating}) => (
                <Col span={5} key={id}>
                    <Link to={`/${displayType === DisplayType.Movies ? 'movie' : 'tvshow'}/${id}`}>
                        <Card
                            key={id}
                            hoverable
                            cover={<img alt={title || name} src={`https://image.tmdb.org/t/p/original/${poster_path}`} />}
                        >
                            <Meta
                                title={displayType === DisplayType.Movies ? title : name}
                                description={
                                (isRated ? `Моя оценка: ${rating}/10\n`:`Средняя оценка: ${Math.round(vote_average)}/10\n`) +
                                    overview.slice(0, 200) + '...'
                                }
                            />
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};
