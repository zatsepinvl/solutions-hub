import React, {FC, useState} from "react";
import {Col, List, Modal, Row, Tag, Typography} from "antd";
import {FileOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import pumlPreview from "./preview/puml.png";
import drawioPreview from "./preview/drawio.png";
import openapiPreview from "./preview/openapi.png";
import {useDemoStore} from "../store/useStore";
import {Solution, SolutionAsset} from "./solution";
import {useParams} from "react-router-dom";

const {Text} = Typography;

export interface SolutionDesignProps {
    solution: Solution
}

const SolutionDesign: FC<SolutionDesignProps> = ({solution}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<SolutionAsset>();

    console.log(solution.readme);

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
                        {solution.keywords.map(keyword =>
                            <Tag color="#1890ff" style={{cursor: "pointer"}}>{keyword}</Tag>
                        )}
                    </div>
                </Col>
                <Col span={24}>
                    {
                        !!solution.assets.length &&
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
                    }
                </Col>
                <Col span={24}>
                    <ReactMarkdown remarkPlugins={[gfm]}  children={solution.readme}/>
                </Col>
            </Row>
        </>

    )
}

export default SolutionDesign;