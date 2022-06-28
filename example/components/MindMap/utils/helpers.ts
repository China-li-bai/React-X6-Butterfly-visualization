
import { parser } from "./jsonEditorParse";
import { Cell, Graph, Path, Node, Edge } from "@antv/x6";
import { nodeConfig } from "../config";


export const toString = (value: string | object) => {
  const isObject = value instanceof Object;

  if (isObject) {
    const entries = Object.entries(value);
    const stringObj = entries.map((val) => [val[0], String(val[1])]);

    return Object.fromEntries(stringObj);
  }

  return String(value);
};

export function getEdgeNodes(
  graph: string,
  isExpanded: boolean = true
): {
  nodes: Node[];
  edges: Edge[];
} {
  const elements = parser(JSON.parse(graph));
  console.log('25', graph, elements)
  let nodes: Node[] = [],
    edges: Edge[] = [];

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];

    if (isNode(el)) {
      const text = renderText(el.text);
      const lines = text.split("\n");
      const lineLengths = lines
        .map((line) => line.length)
        .sort((a, b) => a - b);

      const longestLine = lineLengths.reverse()[0];

      const height = lines.length * 18 < 30 ? 40 : lines.length * 18;

      nodes.push({
        id: el.id,
        label: toString(el.text),
        data: {
          isParent: el.parent,
        },
        width: isExpanded ? 35 + longestLine * 8 : 180,
        height,
      });
    } else {
      edges.push(el);
    }
  }

  return {
    nodes,
    edges,
  };
}
export function getWH(obj: any, isExpanded = true) {
  const text = renderText(obj);
  const lines = text.split("\n");
  const lineLengths = lines
    .map((line) => line.length)
    .sort((a, b) => a - b);

  const longestLine = lineLengths.reverse()[0];

  const height = lines.length * 18 < 30 ? 40 : (lines.length - 1) * (nodeConfig.height);
  console.log("🚀 - file: helpers.ts - line 75 - lines.length", lines.length)
  return {
    width: isExpanded ? 35 + longestLine * 8 : 180,
    height,
  }
}
export function getNextLayout(layout) {
  switch (layout) {
    case "RIGHT":
      return "UP";

    case "UP":
      return "LEFT";

    case "LEFT":
      return "DOWN";

    default:
      return "RIGHT";
  }
}

export function renderText(value: string | object) {
  if (value instanceof Object) {
    let temp = "";
    const entries = Object.entries(value);

    if (Object.keys(value).every((val) => !isNaN(+val))) {
      return Object.values(value).join("");
    }

    entries.forEach((entry) => {
      temp += `${entry[0]}: ${String(entry[1])}\n`;
    });

    return temp;
  }

  return value;
}

function isNode(element: Node | Edge) {
  if ("text" in element) return true;
  return false;
}
export const Obj2Str = (obj) => {
  const res = []
  let temp = obj
  const o = Object.entries(temp).map(x => {
    const v = x?.[1]
    console.log("🚀 - file: helpers.ts - line 107 - v", temp)
    if (Array.isArray(v) && !!v.length) {
      v.forEach(val => {
        Obj2Str(val)
      })
    }
    if (typeof v === 'object') {
      temp = v
      Obj2Str(temp)
    }
    return x.join(":")
  });
  return o

}
export function getCells({ elements, isExpanded }) {
  let nodes = [], edges = []
  elements.forEach(el => {
    if (isNode(el)) {
      const text = renderText(el.text);
      const lines = text.split("\n");
      const lineLengths = lines
        .map((line) => line.length)
        .sort((a, b) => a - b);

      const longestLine = lineLengths.reverse()[0];

      const height = lines.length * 18 < 30 ? 40 : lines.length * 18;

      nodes.push({
        id: el.id,
        label: toString(el.text),
        data: {
          isParent: el.parent,
        },
        width: isExpanded ? 35 + longestLine * 8 : 180,
        height,
      });
    }
  })
}

