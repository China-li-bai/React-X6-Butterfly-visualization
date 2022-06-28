import { Allotment } from "allotment";
import React from "react";
import { JsonEditor } from "../components/JsonEditor";
import { MindMap } from '../components/MindMap';
import "allotment/dist/style.css";
import { Row, Col } from "antd";
import { AppProviders } from "./reducer/index";
const JsonMap: React.FC = () => {
  return (

    // <Allotment>

    //   <Allotment.Pane minSize={200} maxSize={500}>
    //     <JsonEditor />
    //   </Allotment.Pane>

    //   <Allotment.Pane>
    //     <MindMap />
    //   </Allotment.Pane>
    // </Allotment>
    <AppProviders>
      <Row>
        <Col span={6}><JsonEditor /></Col>
        <Col span={18}><MindMap /></Col>
      </Row>
    </AppProviders>

  )
}
export default JsonMap