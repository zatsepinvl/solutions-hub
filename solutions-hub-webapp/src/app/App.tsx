import React from "react";
import {Layout, Menu} from "antd";
import "antd/dist/antd.css";
import {RootStoreContext} from "./store/useStore";
import SolutionViewer from "./solution/SolutionViewer";
import RootStore from "./store/RootStore";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SolutionEditor from "./solution/SolutionEditor";
import SolutionsSearch from "./solution/SolutionsSearch";
import Breadcrumbs from "./navigation/Breadcrumbs";
import "./App.css";


const {Header, Content, Footer} = Layout;

function App() {
    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <Router>
                <div className="App">
                    <Layout className="layout">
                        <Header>
                            <div className="logo"/>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">Solutions</Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{width: "1280px", margin: "auto"}}>
                            <Breadcrumbs/>
                            <div className="site-layout-content">
                                <Switch>
                                    <Route exact path="/search" component={SolutionsSearch}/>
                                    <Route exact path="/solutions/:solutionId/design" component={SolutionViewer}/>
                                    <Route exact path="/solutions/:solutionId/estimate" component={SolutionViewer}/>
                                    <Route exact path="/solutions/:solutionId/editor" component={SolutionEditor}/>
                                    <Route path="*" component={() => <Redirect to="/search"/>}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Solutions Hub ©2021 Created by <a href="https://github.com/zatsepinvl/solutions-hub">Vladimir
                            Zatsepin</a>
                        </Footer>
                    </Layout>
                </div>
            </Router>
        </RootStoreContext.Provider>
    );
}


export default App;
