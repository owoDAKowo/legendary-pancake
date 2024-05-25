import { FC, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchTvShowDetails } from "./query";
import { Col, Rate, Row, Spin, Tag } from "antd";
import { Card, List } from 'antd';
import YouTube from "react-youtube";

export const Movie:FC = () => {
    const { id } = useParams<string>();
    const queryClient = useQueryClient();

    if (!id) {
        return <div>Что-то тут не так...</div>;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['movie'],
        queryFn: () => fetchMovieDetails(id),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        return () => {
            queryClient.setQueryData(['movie'], null);
        };
    }, []);

    return (
        isLoading || !data ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" style={{ fontSize: 24 }} />
            </div>
        ) : (
            <div>
                <Row>
                    <Col span={8}>
                        <img alt={`Постер ${data.title} был украден обезьянами`} width='85%' src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
                    </Col>
                    <Col span={15}>
                        <h1>{data.title}</h1>
                        <hr />
                        <strong> Описание: </strong>
                        <p>{data.overview}</p>
                        <hr />
                        <div className='genere'>
                            <span className='genereTitle'>
                                <strong>Жанры: </strong>
                            </span>
                            {data.genres.map((genre: any) => (
                                <Tag key={genre.id}>{genre.name}</Tag>
                            ))}
                        </div>
                        <Rate className='rate' value={data.vote_average / 2} />
                        <hr />
                        {data.videos.results.length === 0 ? (
                            <strong>Трейлера нет </strong>
                        ) : (
                            <>
                                <strong>Трейлер: </strong>
                                <YouTube videoId={data.videos.results['0'].key} />
                            </>
                        )}
                    </Col>
                </Row>
            </div>
        )
    );
};

export const TvShow: FC = () => {
    const { id } = useParams<string>();
    const queryClient = useQueryClient();

    if (!id) {
        return <div>Что-то тут не так...</div>;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['tvshow'],
        queryFn: () => fetchTvShowDetails(id),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        return () => {
            queryClient.setQueryData(['tvshow'], null);
        };
    }, []);

    return (
        isLoading || !data ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" style={{ fontSize: 24 }} />
            </div>
        ) : (
            <div>
                <Row>
                    <Col span={8}>
                        <img alt={`Постер ${data.name} был украден обезьянами`} width='85%' src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
                    </Col>
                    <Col span={15}>
                        <h1>{data.name}</h1>
                        <hr />
                        <strong> Описание: </strong>
                        <p>{data.overview}</p>
                        <hr />
                        <div className='genere'>
                            <span className='genereTitle'>
                                <strong>Жанры: </strong>
                            </span>
                            {data.genres.map((genre: any) => (
                                <Tag key={genre.id}>{genre.name}</Tag>
                            ))}
                        </div>
                        <Rate className='rate' value={data.vote_average / 2} />
                        <hr />
                        {data.videos.results.length === 0 ? (
                            <strong>Трейлера нет </strong>
                        ) : (
                            <>
                                <strong>Трейлер: </strong>
                                <YouTube videoId={data.videos.results['0'].key} />
                            </>
                        )}
                        <hr />
                        <List
                        grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                        }}
                        dataSource={data.seasons}
                        renderItem={(season: any) => (
                        <List.Item>
                            <Card title={`Сезон ${season.season_number}`}>Эпизодов {season.episode_count}</Card>
                        </List.Item>
                        )}/>
                    </Col>
                </Row>
            </div>
        )
    );
};