import React from "react";
import Editor from "@monaco-editor/react";
import { ConfigActionType, useConfig } from "../../JsonMap/reducer";

// const StyledEditorWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   overflow: auto;
//   user-select: none;
// `;
// const StyledWrapper = styled.div`
//   display: grid;
//   height: calc(100vh - 36px);
//   grid-template-columns: 100%;
//   grid-template-rows: minmax(0, 1fr);
// `;

const editorOptions = {
  formatOnPaste: true,
  minimap: {
    enabled: false,
  },
};


export const JsonEditor: React.FC = () => {
  const { json, dispatch } = useConfig()
  console.log("🚀 - file: index.tsx - line 30 - json", json)
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    try {
      setValue(JSON.stringify(JSON.parse(json), null, 2));

    } catch (error) {
      console.log('error-36', error);
    }
  }, [json]);
  React.useEffect(() => {
    const formatTimer = setTimeout(() => {
      try {
        if (!value) {
          return dispatch({ type: ConfigActionType.SET_JSON, payload: "[]" });
        }

        // parseJson(value);
        dispatch({ type: ConfigActionType.SET_JSON, payload: value });
      } catch (jsonError: any) {
        console.log("🚀 - jsonError", jsonError)

      }
    }, 1500);

    return () => clearTimeout(formatTimer);
  }, [value]);

  return (
    <div>
      {/* <ErrorContainer error={error} setError={setError} /> */}
      <div style={{
        display: 'grid',
        height: 'calc(100vh - 36px)',
        'gridTemplateColumns': '100%',
        'gridTemplateRows': 'minmax(0, 1fr)'
      }}>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={value}
          theme={'vs-dark'}
          options={editorOptions}
          onChange={(value) => {
            setValue(value as string)
          }}
        />
      </div>
    </div >
  );
};
