import React from "react";
import {Col, Input, Layout, Row, Typography} from "antd";
import "antd/dist/antd.css";
import {Redirect, Route, Switch, useHistory,} from "react-router-dom";
import SolutionEditor from "./solution/SolutionEditor";
import SolutionsMainPage from "./solution/SolutionsMainPage";
import "./App.css";
import SolutionPage from "./solution/SolutionPage";

const {Text} = Typography;
const {Header, Content, Footer} = Layout;
const {Search} = Input;

function App() {
    const history = useHistory();

    return (
        <div className="App">
            <Layout className="layout" style={{backgroundColor:"white"}}>
                <Header style={{lineHeight: "32px"}}>
                    <Row align="middle" style={{height: "100%"}} gutter={20}>
                        <Col>
                            <Text className="header-title" onClick={() => history.push("/")}>Solutions Hub</Text>
                        </Col>
                        <Col>
                            <div>
                                <Search placeholder="Search solutions" enterButton allowClear/>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content style={{width: "1080px", margin: "auto"}}>
                  {/*  <Breadcrumbs/>*/}
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/" component={SolutionsMainPage}/>
                            <Route exact path="/solutions/:solutionSlug/design" component={SolutionPage}/>
                            <Route exact path="/solutions/:solutionSlug/estimate" component={SolutionPage}/>
                            <Route exact path="/solutions/new" component={SolutionEditor}/>
                            <Route exact path="/solutions/:solutionSlug/editor" component={SolutionEditor}/>
                            <Route path="*" component={() => <Redirect to="/"/>}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Solutions Hub ©2021 Created by <a href="https://github.com/zatsepinvl/solutions-hub">Vladimir Zatsepin</a>
                </Footer>
            </Layout>
        </div>
    );
}


export default App;
