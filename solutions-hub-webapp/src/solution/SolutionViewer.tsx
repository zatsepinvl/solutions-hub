import React, {useState} from "react";
import ReactMarkdown from "react-markdown"
import {LikeOutlined, EyeOutlined, StarOutlined} from '@ant-design/icons';
import gfm from "remark-gfm";
import {Avatar, Button, Card, Col, Divider, List, Row, Statistic, Tabs, Tag, Typography} from "antd";
import {observer} from "mobx-react";
import {useSolutionStore} from "../store/useStore";
import {useHistory} from "react-router-dom";

const {Title, Text} = Typography;
const { TabPane } = Tabs;

const contributors = [
    {
        name: 'John Connor',
    },
    {
        name: 'Sara Connor',
    },
];

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

const SolutionViewer = observer(() => {
    const solutionStore = useSolutionStore();
    const solution = solutionStore.solution;
    const history = useHistory();
    return (
        <Row gutter={20}>
            <Col span={20}>
                <Row gutter={[20, 16]}>
                    <Col span={20}>
                        <Title level={3} style={{"marginBottom": 0}}>{solution.name}</Title>
                        <Text type="secondary">Updated 10/11/2021</Text>
                    </Col>
                    <Col span={4}>
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
                        <div>
                            <Tag color="magenta">magenta</Tag>
                            <Tag color="red">red</Tag>
                            <Tag color="volcano">volcano</Tag>
                            <Tag color="orange">orange</Tag>
                            <Tag color="gold">gold</Tag>
                            <Tag color="lime">lime</Tag>
                            <Tag color="green">green</Tag>
                            <Tag color="cyan">cyan</Tag>
                            <Tag color="blue">blue</Tag>
                            <Tag color="geekblue">geekblue</Tag>
                            <Tag color="purple">purple</Tag>
                        </div>
                    </Col>
                    <Col span={24}>
                        <Tabs defaultActiveKey="readme">
                            <TabPane tab="Readme" key="readme">
                                <ReactMarkdown remarkPlugins={[gfm]}>{solution.readme}</ReactMarkdown>
                            </TabPane>
                            <TabPane tab="Estimate"  key="estimate">
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
                    dataSource={contributors}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
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

export default SolutionViewer;