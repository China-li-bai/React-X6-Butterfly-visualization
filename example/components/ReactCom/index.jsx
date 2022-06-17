import React from 'react';
import ReactDOM from 'react-dom';
import ReactButterfly from 'butterfly-react';

import data from './data.js';

import './index.less';
import 'antd/dist/antd.css';

export const ReactSample = () => {
  return (
    <ReactButterfly
      {...data}
    />
  );
};

const userSchema = {
  age: {
    tpe: "NUMBER",
    value: 18
  },
  name: {
    type: "STRING",
    value: "张三"
  },
  hobbies: {
    type: "STRING_ARRAY",
    value: [
      "篮球",
      "足球"
    ]
  },
  city: {
    type: "OBJECT",
    attrs: {
      ID: {
        type: "STRING",
        value: "10086"
      },
      name: {
        type: "STRING",
        value: "中国移动"
      }
    }
  }
}

const user = {
  age: 18,
  name: "张三",
  hobbies: [
    "篮球",
    "足球"
  ],
  city: {
    ID: "10086",
    name: "中国移动"
  }
}