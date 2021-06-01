import {observer} from "mobx-react";
import React, {FC} from "react";
import {Card, Col, Divider, Input, List, Row, Space, Tag} from "antd";
import {EyeOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useDemoStore} from "../store/useStore";

const {Search} = Input;
const {Meta} = Card;

const SolutionsMainPage: FC = observer(() => {
    const history = useHistory();
    const demoStore = useDemoStore();
    const solutions = demoStore.solutions;

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <List
                    itemLayout="vertical"
                    dataSource={solutions}
                    split={false}
                    renderItem={solution => (
                        <List.Item>
                            <Card hoverable onClick={() => history.push(`/solutions/${solution.slug}/design`)}>
                                <Meta title={solution.name}/>
                                <>
                                    <Space direction={"vertical"} style={{marginTop:10}}>
                                        <div>
                                            {solution.description}
                                        </div>
                                        <div>
                                            {solution.keywords.map(keyword =>
                                                <Tag color="blue" style={{cursor: "pointer"}}>{keyword}</Tag>
                                            )}
                                        </div>
                                        <div>
                                            {solution.updatedAt.format("MMM d YYYY")}
                                            <Divider type="vertical"/>
                                            <StarOutlined/> {solution.stars}
                                            <Divider type="vertical"/>
                                            <EyeOutlined/> {solution.views}
                                            <Divider type="vertical"/>
                                            <UserOutlined/> {solution.contributors.map(c => c.name).join(", ")}
                                        </div>
                                    </Space>
                                </>
                            </Card>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
})

export default SolutionsMainPage;