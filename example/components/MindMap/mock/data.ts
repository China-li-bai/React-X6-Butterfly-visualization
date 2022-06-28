import { MindMapData } from "../interface";

export const data: MindMapData = {
  id: "1",
  type: "topic",
  label: `userInterface`,
  width: 260,
  height: 250,

  children: [
    {
      id: "1-1",
      type: "topic-branch",
      label: "分支主题1",
      width: 100,
      height: 40,
      children: [
        {
          id: "1-1-1",
          type: "topic-child",
          label: "子主题1",
          width: 60,
          height: 30,
        },
        {
          id: "1-1-2",
          type: "topic-child",
          label: "子主题2",
          width: 60,
          height: 30,
        },
      ],
    },
    {
      id: "1-2",
      type: "topic-branch",
      label: "分支主题2",
      width: 100,
      height: 40,
    },
  ],
};

export const objData = {
  type: "OBJECT",
  id: "1",
  width: 260,
  height: 250,
  user: {
    type: "OBJECT",
    id: "1-1--1--1-21-2-12-",
  },
  DeviceID: {
    type: "STRING",
    id: "3-1",
  },
  arr: [111, 222, 333],
  arr1: [111, 222, 333, {
    a2: 1,
    b3: 2
  }]
};
