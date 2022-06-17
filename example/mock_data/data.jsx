export const columns = [

  {
    key: 'id',
    title: 'ID',
    primaryKey: true,
    width: 60
  },
  {
    key: 'type',
    title: '标题',
    width: 60,
    render: (val, row) => {
      return val.toString().toUpperCase();
    }
  },
  {
    key: 'desc',
    title: '描述',
    width: 90
  }
];

export const data = {
  "nodes": [
    {
      "top": 100,
      "left": 200,
      "id": "aaa",
      "title": "us",
      "fields": [
        {
          "id": "field_1",
          "type": "string",
          "desc": "字段1"
        }
      ]
    },
    {
      "top": 500,
      "left": 600,
      "id": "bbb",
      "title": "bbb",
      "fields": [
        {
          "id": "field_1",
          "type": "string",
          "desc": "字段1"
        },
        {
          "id": "field_2",
          "type": "string",
          "desc": "字段2"
        },
        {
          "id": "field_3",
          "type": "string",
          "desc": "字段3"
        }
      ]
    },
    {
      "top": 540,
      "left": 1000,
      "id": "fff",
      "title": "自定义空内容",
      "fields": []
    }
  ],
  "edges": [
    {
      "id": 1,
      "sourceNode": "aaa",
      "targetNode": "bbb",
      "source": "field_1",
      "target": "field_1",
      "label": "label"
    },
    {
      "id": 2,
      "sourceNode": "aaa",
      "targetNode": "bbb",
      "source": "field_3",
      "target": "field_3"
    },

  ]
};
