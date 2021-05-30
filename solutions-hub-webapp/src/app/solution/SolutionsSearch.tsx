import {observer} from "mobx-react";
import React, {FC} from "react";
import {Col, Input, List, Row, Space} from "antd";
import {
    SolutionOutlined, StarOutlined, EyeOutlined, UserOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useDemoStore} from "../store/useStore";

const {Search} = Input;

const SolutionsSearch: FC = observer(() => {
    const history = useHistory();
    const demoStore = useDemoStore();
    const solutions = demoStore.solutions;

    return (
        <Row gutter={[20, 20]}>
            <Col span={16} offset={4}>
                <Search placeholder="Search for..." enterButton="Search"/>
            </Col>
            <Col span={16} offset={4}>
                <List
                    itemLayout="vertical"
                    dataSource={solutions}
                    renderItem={solution => (
                        <List.Item
                            actions={[
                                <Space key="list-vertical-star-o">
                                    {solution.updatedAt.format("MMM d YYYY")}
                                </Space>,
                                <Space key="list-vertical-star-o">
                                    <StarOutlined/> {solution.stars}
                                </Space>,
                                <Space key="list-vertical-star-o">
                                    <EyeOutlined/> {solution.views}
                                </Space>,
                                <Space>
                                    <UserOutlined /> {solution.contributors.map(c => c.name).join(", ")}
                                </Space>
                            ]}

                        >
                            <List.Item.Meta
                                title={
                                    <a onClick={() => history.push(`/solutions/${solution.slug}/design`)}>
                                        {solution.name}
                                    </a>
                                }
                                description={solution.description}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
})

export default SolutionsSearch;