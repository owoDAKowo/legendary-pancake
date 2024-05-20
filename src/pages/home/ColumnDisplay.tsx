import { Card, Col, Row } from "antd";
import { DisplayType } from ".";
// import Meta from Card.Meta;

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

export const ColumnDisplay = ({ data, displayType }: Props) => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                {data.map((item) => (
                    <Col span={8} key={item.id}>
                        <Card
                            hoverable
                            cover={<img alt={item.title || item.name} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />}
                        >
                            <Meta
                                title={displayType === DisplayType.Movies ? item.title : item.name}
                                description={`Дата выхода: ${item.release_date}`}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
