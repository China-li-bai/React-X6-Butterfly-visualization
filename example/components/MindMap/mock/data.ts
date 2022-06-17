import { MindMapData } from "../interface";

export const data: MindMapData = {
  id: '1',
  type: 'topic',
  label: `userInterface`,
  width: 260,
  height: 250,

  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1',
      width: 100,
      height: 40,
      children: [
        {
          id: '1-1-1',
          type: 'topic-child',
          label: '子主题1',
          width: 60,
          height: 30,
        },
        {
          id: '1-1-2',
          type: 'topic-child',
          label: '子主题2',
          width: 60,
          height: 30,
        },
      ],
    },
    {
      id: '1-2',
      type: 'topic-branch',
      label: '分支主题2',
      width: 100,
      height: 40,
    },
  ],
}

export const objData = {
  user: {
    desc: {
      type: 'OBJECT',
      value: 'user',
      required: true,
      isParameter: true,
      chineseName: '用户',
      EnName: 'user',
    },

    param: {
      desc: {
        type: 'OBJECT',
        value: 'param',
        required: true,
        isParameter: true,
        chineseName: '命令参数',
        EnName: 'parameter',
      },
      DeviceID: {
        desc: {
          type: 'STRING',
          value: 'DeviceID',
          required: true,
          isParameter: true,
          chineseName: '设备id',
          EnName: 'DeviceID',
        },
      }
    },
    fc: {
      desc: {
        type: 'STRING',
        value: 'fc',
        required: true,
        isParameter: true,
        chineseName: '方法名',
        EnName: 'fc',
      },

    }
  }
}