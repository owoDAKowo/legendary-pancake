import { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetails } from "./query";
import { Col, Rate, Row, Spin, Tag } from "antd";
import { Card, List } from 'antd';
import YouTube from "react-youtube";
import { rateContent } from "./mutation";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const onSuccess = () => {
    toast.success('Успешно оценено!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

}
const onError = () => {
    toast.error('Ошибка при оценке!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const Movie: FC = () => {
    const { id } = useParams<string>();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState<number>(0);

    const { data, isLoading } = useQuery({
        queryKey: ['movie'],
        queryFn: () => fetchDetails(id || '', 'movie'),
        refetchOnWindowFocus: false
    });

    const { mutate: rateMovieMutation } = useMutation({
        mutationKey: ['rateMovie'],
        mutationFn: (id: string) => rateContent(id, rating, 'movie'),
        onSuccess,
        onError,
    });

    useEffect(() => {
        return () => {
            queryClient.setQueryData(['movie'], null);
        };
    }, []);

    if (!id) {
        return <div>Что-то тут не так...</div>;
    }

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
                        <div>
                            <span className='genereTitle'>
                                <strong>Жанры: </strong>
                            </span>
                            {data.genres.map((genre: any) => (
                                <Tag key={genre.id}>{genre.name}</Tag>
                            ))}
                        </div>
                        <Rate className='rate' count={10} value={rating ? rating : Math.round(data.vote_average)} onChange={(e) => {
                            setRating(e);
                            rateMovieMutation(id)
                        }} /> {rating ? rating : Math.round(data.vote_average)}/10
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
    const [rating, setRating] = useState<number>(0);

    const { data, isLoading } = useQuery({
        queryKey: ['tvshow'],
        queryFn: () => fetchDetails(id || '', 'tv'),
        refetchOnWindowFocus: false
    });

    const { mutate: rateTvShow } = useMutation({
        mutationKey: ['rateMovie'],
        mutationFn: (id: string) => rateContent(id, rating, 'tv'),
        onSuccess,
        onError,
    });

    useEffect(() => {
        return () => {
            queryClient.setQueryData(['tvshow'], null);
        };
    }, []);

    if (!id) {
        return <div>Что-то тут не так...</div>;
    }

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
                        <Rate className='rate' count={10} value={rating ? rating : Math.round(data.vote_average)} onChange={(e) => {
                            setRating(e);
                            rateTvShow(id)
                        }} /> {rating ? rating : Math.round(data.vote_average)}/10
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
                            )} />
                    </Col>
                </Row>
            </div>
        )
    );
};