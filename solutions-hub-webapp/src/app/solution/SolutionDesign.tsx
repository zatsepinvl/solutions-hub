import React, {FC, useState} from "react";
import {Col, List, Modal, Row, Tag, Typography} from "antd";
import {FileOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import pumlPreview from "./preview/puml.png";
import drawioPreview from "./preview/drawio.png";
import openapiPreview from "./preview/openapi.png";
import {useSolutionStore} from "../store/useStore";
import {SolutionAsset} from "./solution";

const {Text} = Typography;

const SolutionDesign: FC = () => {
    const solutionStore = useSolutionStore();
    const solution = solutionStore.solution;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<SolutionAsset>();


    const showFileDemoPreview = (asset: SolutionAsset) => {
        setSelectedFile(asset);
        setIsModalVisible(true);
    };

    return (
        <>
            <Modal title="File Demo Preview"
                   width={700}
                   visible={isModalVisible}
                   onOk={() => setIsModalVisible(false)}
                   onCancel={() => setIsModalVisible(false)}
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
                        dataSource={solution.assets}
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
        </>

    )
}

export default SolutionDesign;