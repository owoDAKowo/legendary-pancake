import { Card, Col, Row } from "antd";
import { DisplayType } from ".";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    release_date: string;
}

interface Props {
    data: DisplayData[];
    displayType: DisplayType;
}

export const ColumnDisplay = ({ data, displayType}: Props) => {
    return (
        <Row gutter={16}>
            {data.map((item) => (
                <Col span={4}>
                    <Link to={`/${displayType===DisplayType.Movies ? 'movie':'tvshow'}/${item.id}`}>
                    <Card
                        hoverable
                        cover={<img alt = {item.title || item.name} src = {`https://image.tmdb.org/t/p/original/${item.poster_path}`} />}
                    >
                        <Meta
                        title={displayType === DisplayType.Movies ? item.title : item.name}
                            description={item.overview.slice(0, 200)+'...'}
                        />
                    </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};
