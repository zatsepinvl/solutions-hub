import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, Radio, Row, Space, Tooltip, Typography, Upload} from 'antd';
import {
    AlignLeftOutlined,
    FileOutlined,
    InboxOutlined,
    TagsOutlined,
    UnorderedListOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import {DraggerProps} from "antd/lib/upload";
import EditableTagGroup from "../../uikit/EditableTagGroup/EditableTagGroup";
import {useHistory} from 'react-router-dom';

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
                <Col className="gutter-row" span={20} offset={2}>
                    <Title level={3}>Edit solution</Title>
                    <Card>
                        <Form
                            layout={"vertical"}
                            form={form}
                        >
                            <Form.Item label={<Space><AlignLeftOutlined/> Name</Space>}>
                                <Input/>
                            </Form.Item>

                            <Form.Item label={<Space><AlignLeftOutlined/> Short description</Space>}>
                                <Input/>
                            </Form.Item>

                            <Form.Item label={<Space><TagsOutlined/> Tags</Space>}>
                                <EditableTagGroup/>
                            </Form.Item>

                            <Form.Item label={<Space><UsergroupAddOutlined/> Contributors</Space>}>
                                <EditableTagGroup/>
                            </Form.Item>

                            <Form.Item label={<Space><FileOutlined/> Assets</Space>}>
                                <Dragger height={60}>
                                    <Space>
                                        <InboxOutlined/>
                                        <p className="ant-upload-text">Add any file</p>
                                    </Space>
                                </Dragger>
                            </Form.Item>

                            <Form.Item label={<Space><UnorderedListOutlined/> Readme type</Space>}>
                                <Radio.Group>
                                    <Tooltip title="Write readme in markdown language">
                                        <Radio value="markdown">Markdown</Radio>
                                    </Tooltip>
                                    <Tooltip title="Upload a file">
                                        <Radio value="file">File</Radio>
                                    </Tooltip>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label={<Space><UnorderedListOutlined/> Readme</Space>}>
                                <Dragger height={60} multiple={false}>
                                    <Space>
                                        <InboxOutlined/>
                                        <p className="ant-upload-text">Upload a file that will be shown as main readme
                                            of the solution</p>
                                    </Space>
                                </Dragger>
                            </Form.Item>

                            <Form.Item label={<Space><UnorderedListOutlined/> Readme</Space>}>
                                Markdown
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
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SolutionEditor;