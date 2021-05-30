import React from "react";
import {Layout, Typography} from "antd";
import "antd/dist/antd.css";
import {Redirect, Route, Switch, useHistory,} from "react-router-dom";
import SolutionEditor from "./solution/SolutionEditor";
import SolutionsSearch from "./solution/SolutionsSearch";
import Breadcrumbs from "./navigation/Breadcrumbs";
import "./App.css";
import SolutionPage from "./solution/SolutionPage";

const {Text} = Typography;

const {Header, Content, Footer} = Layout;

function App() {
    const history = useHistory();

    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <Text className="header-title" onClick={() => history.push("/")}>Solutions Hub</Text>
                </Header>
                <Content style={{width: "1280px", margin: "auto"}}>
                    <Breadcrumbs/>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/" component={SolutionsSearch}/>
                            <Route exact path="/solutions/:solutionSlug/design" component={SolutionPage}/>
                            <Route exact path="/solutions/:solutionSlug/estimate" component={SolutionPage}/>
                            <Route exact path="/solutions/new" component={SolutionEditor}/>
                            <Route exact path="/solutions/:solutionSlug/editor" component={SolutionEditor}/>
                            <Route path="*" component={() => <Redirect to="/"/>}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Solutions Hub ©2021 Created by
                    <a href="https://github.com/zatsepinvl/solutions-hub">
                        Vladimir Zatsepin
                    </a>
                </Footer>
            </Layout>
        </div>
    );
}


export default App;
