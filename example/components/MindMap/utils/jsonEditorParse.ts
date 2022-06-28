/* 
1、json 文本可编辑  
2、把一般的json 对象转换为可视化卡片
3、卡片可编辑
  - 循环obj每一项，增加一项，卡片搞定递增高度
  - 每一项需要分开 key : value
 */

import { getWH } from "./helpers";

const filterChild = ([k, v]) => {
  const notNull = v !== null;
  const isArray = Array.isArray(v) ? !!v.length : typeof v === "object";
  return notNull && isArray;
};

const filterValues = ([k, v]) => {
  if (Array.isArray(v) || v instanceof Object) return false;

  return true;
};

function generateChildren(object: Object, nextId: () => string) {
  return Object.entries(object)
    .filter(filterChild)
    .flatMap(([k, v]) => [
      {
        id: nextId(),
        label: k,
        parent: true,
        children: extract(v, nextId),
        ...getWH(k)
      },
    ]);
}

function generateNodeData(object: Object | number) {
  const isObject = object instanceof Object;

  if (isObject) {
    const entries = Object.entries(object).filter(filterValues);
    return Object.fromEntries(entries);
  }

  return object.toString();
}

const extract = (
  os: string[] | object[] | null,
  nextId = (
    (id) => () =>
      String(++id)
  )(0)
) => {
  if (!os) return [];
  return [os].flat().map((o) => ({
    id: nextId(),
    label: generateNodeData(o),
    children: generateChildren(o, nextId),
    parent: false,
    ...getWH(generateNodeData(o))
  }));
};

const flatten = (xs: { id: string; children: never[] }[]) =>
  xs.flatMap(({ children, ...rest }) => [rest, ...flatten(children)]);

const relationships = (xs: { id: string; children: never[] }[]) => {
  return xs.flatMap(({ id: source, children = [] }) => [
    ...children.map(({ id: target }) => ({
      id: `edge${source}-${target}`,
      source,
      target,
    })),
    ...relationships(children),
  ]);
};

export const parser = (input: string | string[]) => {
  try {
    if (typeof input !== "object") input = JSON.parse(input);
    if (!Array.isArray(input)) input = [input];

    const mappedElements = extract(input);

    const res = [...flatten(mappedElements), ...relationships(mappedElements)];

    return { mappedElements: !!mappedElements.length ? mappedElements[0] : {}, elements: res };
  } catch (error) {
    console.log(error);

    console.error("An error occured while parsing JSON data!");
    return {};
  }
};
