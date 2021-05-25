import {Breadcrumb} from "antd";
import React, {FC} from "react";


const Breadcrumbs: FC = () => {
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Solutions</Breadcrumb.Item>
            <Breadcrumb.Item>Solution Hub</Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs;