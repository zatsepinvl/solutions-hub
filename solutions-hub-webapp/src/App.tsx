import React, {useCallback, useState} from 'react';
import './App.css';
import {Layout, Menu} from 'antd';
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

const {Header, Content, Footer} = Layout;

function Component({handler}: any) {
    console.log("render: Component");
    return (
        <div>
            <button onClick={handler}>Component</button>
        </div>
    )
}

const a  =1;
function App() {
    console.log("render: App");
    const [state, setState] = useState(0);
    const clickHandler = () => {
        setState(state + 1)
    }
    const propsHandler = useCallback(() => {
    }, [a]);
    return (
        <div>
            <button onClick={clickHandler}>App</button>
            <Component handler={propsHandler}/>
        </div>
        /*  <RootStoreContext.Provider value={new RootStore()}>
              <Router>
                  <div className="App">
                      <Layout className="layout">
                          <Header>
                              <div className="logo"/>
                              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                  <Menu.Item key="3">Home</Menu.Item>
                                  <Menu.Item key="2">My Solutions</Menu.Item>
                                  <Menu.Item key="1">Search</Menu.Item>
                              </Menu>
                          </Header>
                          <Content style={{width: "1280px", margin: "auto"}}>
                              <Breadcrumbs/>
                              <div className="site-layout-content">
                                  <Switch>
                                      <Route exact path="/search" component={SolutionsSearch}/>
                                      <Route exact path="/solutions/:solutionId/readme" component={SolutionViewer}/>
                                      <Route exact path="/solutions/:solutionId/estimate" component={SolutionViewer}/>
                                      <Route exact path="/solutions/:solutionId/editor" component={SolutionEditor}/>
                                      <Route path="*" component={() => <Redirect to="/search"/>}/>
                                  </Switch>
                              </div>
                          </Content>
                          <Footer style={{textAlign: 'center'}}>Solution Hub ©2021 Created by SolutionHub Inc.</Footer>
                      </Layout>
                  </div>
              </Router>
          </RootStoreContext.Provider>*/
    );
}


export default App;
