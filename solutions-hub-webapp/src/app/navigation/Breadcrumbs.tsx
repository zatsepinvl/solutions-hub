import {Breadcrumb} from "antd";
import React, {FC} from "react";


const Breadcrumbs: FC = () => {
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Breadcrumbs</Breadcrumb.Item>
            <Breadcrumb.Item>Will Be</Breadcrumb.Item>
            <Breadcrumb.Item>Here</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs;