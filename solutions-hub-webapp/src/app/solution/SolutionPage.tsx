import React from "react";
import {EyeOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Col, Divider, List, Row, Statistic, Tabs, Typography} from "antd";
import {observer} from "mobx-react";
import {useSolutionStore} from "../store/useStore";
import {useHistory} from "react-router-dom";
import SolutionDesign from "./SolutionDesign";

const {Title, Text} = Typography;
const {TabPane} = Tabs;

const similarSolutions = [
    {
        name: 'GitLab',
    },
    {
        name: 'GitHub',
    },
    {
        name: 'Atlassian Confluence',
    },
];

const SolutionPage = observer(() => {
    const solutionStore = useSolutionStore();
    const solution = solutionStore.solution;
    const history = useHistory();

    return (
        <Row gutter={20}>
            <Col span={20}>
                <Row gutter={20}>
                    <Col flex={1}>
                        <Title level={3} style={{"marginBottom": 0}}>{solution.name}</Title>
                        <Text type="secondary">Updated 10/11/2021</Text>
                    </Col>
                    <Col>
                        <Row gutter={20} justify="center">
                            <Col>
                                <Button type="primary" onClick={() => {
                                    history.push("/solutions/solution-hub/editor")
                                }}>
                                    Edit
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary">
                                    Export
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Tabs defaultActiveKey="design">
                            <TabPane tab="Design" key="design">
                                <SolutionDesign/>
                            </TabPane>
                            <TabPane tab="Estimate" key="estimate">
                                Estimate will be here...
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Col>


            <Col span={4}>
                <Statistic title="Stars" value={1128} prefix={<StarOutlined/>}/>
                <Statistic title="Views" value={112893} prefix={<EyeOutlined/>}/>

                <Divider/>
                <Title level={5}>Contributors</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={solution.contributors}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<UserOutlined style={{"fontSize": "24px"}}/>}
                                title={<a href="https://ant.design">{item.name}</a>}
                            />
                        </List.Item>
                    )}
                />

                <Divider/>
                <Title level={5}>Similar solutions</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={similarSolutions}
                    renderItem={item => (
                        <List.Item>
                            <Text><a>{item.name}</a></Text>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
});

export default SolutionPage;