import React, {FC, useState} from "react";
import {Button, Card, Col, List, Modal, Row, Space, Tag, Tooltip, Typography} from "antd";
import {DownloadOutlined, FileOutlined, UnorderedListOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import pumlPreview from "./preview/puml.png";
import openapiPreview from "./preview/openapi.png";
import {Solution, SolutionAsset} from "./solution";

const {Text} = Typography;
const {Meta} = Card;

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
                   width={1000}
                   visible={isModalVisible}
                   onOk={() => setIsModalVisible(false)}
                   onCancel={() => setIsModalVisible(false)}
                   okText={"Great!"}
                   cancelText={"Got it!"}
                   centered={true}>
                {selectedFile?.name.endsWith(".puml") && <img width={600} src={pumlPreview}/>}
                {selectedFile?.name.endsWith(".drawio") && (
                    <iframe frameBorder="0" style={{"width": "100%", "height": "500px"}}
                            src="https://www.draw.io?lightbox=1#Uhttp%3A%2F%2Flocalhost%3A3000%2Fsolutions-hub.drawio"/>
                )}
                {selectedFile?.name.endsWith(".yaml") && <img width={600} src={openapiPreview}/>}
            </Modal>
            <Row gutter={[10, 20]}>
                <Col span={24}>
                    <div>
                        {solution.keywords.map(keyword =>
                            <Tag color="blue" style={{cursor: "pointer"}}>{keyword}</Tag>
                        )}
                    </div>
                </Col>
                {
                    !!solution.assets.length &&
                    <Col span={24}>
                        <Card title={
                            <Space>
                                <UnorderedListOutlined/> Assets
                            </Space>
                        }
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={solution.assets}
                                size="small"
                                renderItem={item => (
                                    <List.Item>
                                        <Space>
                                            <FileOutlined/>
                                            <Text>
                                                <a>
                                                    {item.name}
                                                </a>
                                            </Text>
                                        </Space>
                                        <Text type="secondary">
                                            <Space>
                                                <Tooltip title="Download">
                                                    <Button size="small" type="text" icon={<DownloadOutlined/>}/>
                                                </Tooltip>
                                                <Text>
                                                    {item.updatedAt.format('D MMM YYYY')}
                                                </Text>
                                            </Space>
                                        </Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                }
                <Col span={24}>
                    <Card title={
                        <Space>
                            <UnorderedListOutlined/> Readme
                        </Space>
                    }>
                        <ReactMarkdown skipHtml={false} remarkPlugins={[gfm]} children={solution.readme}/>
                    </Card>
                </Col>
            </Row>
        </>

    )
}

export default SolutionDesign;