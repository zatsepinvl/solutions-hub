import React, {useState} from "react";
import ReactMarkdown from "react-markdown"
import {LikeOutlined, EyeOutlined, StarOutlined, FileOutlined} from '@ant-design/icons';
import gfm from "remark-gfm";
import {Avatar, Button, Card, Col, Divider, List, Modal, Row, Statistic, Tabs, Tag, Typography} from "antd";
import {observer} from "mobx-react";
import {useSolutionStore} from "../store/useStore";
import {useHistory} from "react-router-dom";
import dayjs from "dayjs";

import pumlPreview from "./preview/puml.png";
import drawioPreview from "./preview/drawio.png";
import openapiPreview from "./preview/openapi.png";

const {Title, Text} = Typography;
const {TabPane} = Tabs;

const contributors = [
    {
        name: "Vladimir Zatsepin",
    },
    {
        name: "<Your name here ;)>",
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

interface File {
    name: String,
    updatedAt: dayjs.Dayjs
}

const files: File[] = [
    {
        name: 'solutions-hub-openapi.yaml',
        updatedAt: dayjs()
    },
    {
        name: 'solutions-hub-solution-design.drawio',
        updatedAt: dayjs()
    },
    {
        name: 'sequence-diagram.puml',
        updatedAt: dayjs()
    },
];

const SolutionViewer = observer(() => {
    const solutionStore = useSolutionStore();
    const solution = solutionStore.solution;
    const history = useHistory();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();


    const showFileDemoPreview = (file: File) => {
        setSelectedFile(file);
        setIsModalVisible(true);
    };

    return (
        <Row gutter={20}>

            <Modal title="File Demo Preview"
                   width={700}
                   visible={isModalVisible}
                   onOk={() => setIsModalVisible(false)}
                   onCancel={() => setIsModalVisible(false)}
                   cancelButtonProps={{}}
                   okText={"Great!"}
                   cancelText={"Got it!"}
                   centered={true}>
                <p>
                    Solutions Hub is going to show in place the files like PlantUML diagrams, draw.io files and OpenAPI
                    specs.
                    You dont need to download them or open in another view.
                    Everything is displayed by a click. Here is the idea how the file will be rendered:
                </p>
                {selectedFile?.name.endsWith(".puml") && <img width={600} src={pumlPreview}/>}
                {selectedFile?.name.endsWith(".drawio") && <img width={600} src={drawioPreview}/>}
                {selectedFile?.name.endsWith(".yaml") && <img width={600} src={openapiPreview}/>}
            </Modal>

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
                                <Row gutter={[0, 10]}>
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
                                        <List
                                            bordered
                                            itemLayout="horizontal"
                                            dataSource={files}
                                            size="small"
                                            renderItem={item => (
                                                <List.Item>
                                                    <div>
                                                        <FileOutlined/>
                                                        <Text style={{marginLeft: "20px"}}>
                                                            <a onClick={() => showFileDemoPreview(item)}>{item.name}</a>
                                                        </Text>
                                                    </div>
                                                    <Text type="secondary">
                                                        {item.updatedAt.format('D MMM YYYY')}
                                                    </Text>
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <ReactMarkdown remarkPlugins={[gfm]}>{solution.readme}</ReactMarkdown>
                                    </Col>
                                </Row>
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