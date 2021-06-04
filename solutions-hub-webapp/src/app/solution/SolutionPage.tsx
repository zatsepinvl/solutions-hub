import React from "react";
import {EyeOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Col, Divider, List, Row, Space, Tabs, Tooltip, Typography} from "antd";
import {observer} from "mobx-react";
import {useDemoStore} from "../store/useStore";
import {useHistory, useParams} from "react-router-dom";
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

interface SolutionPageParams {
    solutionSlug: string
}

const SolutionPage = observer(() => {
    const history = useHistory();
    const {solutionSlug} = useParams<SolutionPageParams>();
    const demoStore = useDemoStore();

    const solution = demoStore.getSolutionBySlug(solutionSlug);
    const otherSolutions = demoStore.solutions.filter(s => s.id !== solution.id);

    return (
        <Row gutter={[20, 10]}>
            <Col span={20}>
                <Row gutter={[20, 10]}>
                    <Col flex={1}>
                        <Title level={3} style={{"marginBottom": 0}}>{solution.name}</Title>
                        <Text>Updated {solution.updatedAt.format("MMM d YYYY")}</Text>
                        <Divider type={"vertical"}/>
                        <Tooltip title={"Total unique users veiwed the page"}>
                            <Space>
                                <EyeOutlined/>
                                <Text>{solution.views}</Text>
                            </Space>
                        </Tooltip>
                    </Col>
                    <Col>
                        <Row gutter={20} justify="center">
                            <Col>
                                <Space>
                                    <Button type="primary" onClick={() => {
                                        history.push("/solutions/solution-hub/editor")
                                    }}>
                                        Edit
                                    </Button>
                                    <Button type="primary">
                                        Export
                                    </Button>
                                    <Tooltip title={"When you like the solution you can start it"}>
                                        <Button icon={<StarOutlined/>}>
                                            Star | {solution.stars}
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <SolutionDesign solution={solution}/>
                    </Col>
                </Row>
            </Col>


            <Col span={4}>
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
                    dataSource={otherSolutions}
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