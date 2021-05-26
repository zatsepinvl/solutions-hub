import {observer} from "mobx-react";
import React, {FC} from "react";
import {Col, Input, List, Row, Space} from "antd";
import {
    SolutionOutlined, StarOutlined, EyeOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

const {Search} = Input;


const data = [
    {
        title: 'Ant Design Title 1',
        readmeShort: "some text here...."
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


const SolutionsSearch: FC = observer(() => {
    const history = useHistory();
    return (
        <Row gutter={[20, 20]}>
            <Col span={16} offset={4}>
                <Search placeholder="Keyword or name" enterButton="Search"/>
            </Col>
            <Col span={16} offset={4}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Space key="list-vertical-star-o">
                                    <StarOutlined/> {"156"}
                                </Space>,
                                <Space key="list-vertical-star-o">
                                    <EyeOutlined/> {"156"}
                                </Space>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<SolutionOutlined style={{"fontSize": "24px"}}/>}
                                title={<a href="#"
                                          onClick={() => history.push("/solutions/solution-hub/design")}>{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
})

export default SolutionsSearch;