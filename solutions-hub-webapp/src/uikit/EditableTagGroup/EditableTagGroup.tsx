import React, {FC, useRef, useState} from "react";
import {Input, Tag, Tooltip} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import "./EditableTagGroup.css"

interface EditableTagGroup {
    tags: string[],
    onTagsChanged: (tags: string[]) => void
}

const EditableTagGroup: FC = () => {
    const [tags, setTags] = useState(["React", "Spring", "REST API"]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editInputValue, setEditInputValue] = useState("");
    const [editInputIndex, setEditInputIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>();
    const editInputRef = useRef<HTMLInputElement>();

    const handleClose = (removedTag: any) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
        inputRef.current?.focus();
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue("");
    };

    const handleEditInputChange = (e: any) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;

        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue("");
    };

    const saveInputRef = (input: any) => {
        inputRef.current = input;
    };

    const saveEditInputRef = (input: any) => {
        editInputRef.current = input;
    };

    return (
        <>
            {tags.map((tag: string, index: number) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={saveEditInputRef}
                            key={tag}
                            size="small"
                            className="tag-input"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }

                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag
                        className="tag"
                        key={tag}
                        onClose={() => handleClose(tag)}
                    >
                      <span>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible && (
                <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined/> New Tag
                </Tag>
            )}
        </>
    );
}

export default EditableTagGroup;