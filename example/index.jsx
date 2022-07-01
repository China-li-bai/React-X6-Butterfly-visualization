import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { Layout, Tooltip } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { JqCom } from './components/JqCom'
import { ReactSample } from './components/ReactCom'
import 'antd/dist/antd.css';
import './index.less';
import MainMap from './components/MainMap/MainMap';
import MindMap from './components/MindMap'
import JsonMap from './JsonMap'
import ExamplePrint from './example-print/examples/index'
import Draw from '../example/draw/src/pages'
import { JsonEditor } from './components/JsonEditor';
const { Header } = Layout;

import { Map, SplitLayoutBox } from './components/X6Map/index'


ReactDOM.render((
  <Router>
    <Layout>
      <Header className='header'>DTDesign-React可视化建模组件</Header>
      <Layout>
        {/* <ExamplePrint /> */}
        {/* <MainMap /> */}
        {/* <JsonMap /> */}
        {/* <JqCom /> */}
        {/* <ReactSample /> */}
        {/* <Draw /> */}
        {/* <Map /> */}
        <SplitLayoutBox firstChildren={<JsonEditor />} primary={'second'} secondChildren={<Draw />} />
      </Layout>
    </Layout>
  </Router>
), document.getElementById('main'));
