import React, {useState} from 'react';
import {Form, Input, Button, Radio, Col, Row, Tag, Tooltip, Divider, Tabs} from 'antd';
import {Upload, message} from 'antd';
import {InboxOutlined, PlusOutlined} from '@ant-design/icons';
import {DraggerProps} from "antd/lib/upload";
import EditableTagGroup from "./EditableTagGroup";
import {useHistory} from 'react-router-dom';
import {Typography, Space} from 'antd';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const {Text, Link, Title} = Typography;

const {Dragger} = Upload;
const {TextArea} = Input;

const importDaggerProps: DraggerProps = {
    name: "import",
    showUploadList: false,
};

const attachmentDaggerProps: DraggerProps = {
    name: "attachment",
    showUploadList: true,
    multiple: true,
};

function SolutionEditor() {
    const [form] = Form.useForm();

    const [showDragger, setShowDragger] = useState(false);

    const history = useHistory();

    const onDrag = () => {
        console.log("onFormDrag")
        setShowDragger(true);
    }

    return (
        <div className="edit-solution-form">
            <Row gutter={20}>
                <Col className="gutter-row" span={20}>
                    <Form
                        layout={"vertical"}
                        form={form}
                    >
                        <Form.Item label="Solution name">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Keywords">
                            <EditableTagGroup/>
                        </Form.Item>

                        <Form.Item label="Contributors">
                            <EditableTagGroup/>
                        </Form.Item>

                        <Form.Item label="Readme">
                            <Radio.Group value="edit">
                                <Radio.Button value="edit">Edit</Radio.Button>
                                <Radio.Button value="preview">Preview</Radio.Button>
                            </Radio.Group>
                            <div onDragEnter={onDrag}>
                                <TextArea rows={8}/>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={() => {
                                history.push("/solutions/solution-hub/readme")
                            }}>Save</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col className="gutter-row" span={4}>
                    <Title level={5}>Import</Title>
                    <div style={{"height": "200px"}}>
                        <Dragger {...importDaggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Import Word file</p>
                        </Dragger>
                    </div>

                    <Divider/>

                    <Title level={5}>Attachments</Title>
                    <div style={{"height": "200px"}}>
                        <Dragger {...attachmentDaggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Import Word file</p>
                        </Dragger>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SolutionEditor;