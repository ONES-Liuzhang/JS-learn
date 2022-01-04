import React, { useState } from "react";

function ZFormCreate(Form) {
  const rules = {};
  const [fields, setFields] = useState({});
  return () => {
    const getFieldDesc = (field, rule) => {
      rules[field] = rule;
      if (!fields[field]) fields[field] = {};

      return (InputComp) => {
        // 克隆一份组件
        return React.cloneElement(InputComp, {
          name: field,
          value: fields[field].value,
          onInput: (e) => {
            const value = e.target.value;
            const copyFields = Object.assign({}, fields);

            copyFields[field].value = value;

            setFields(copyFields);
          },
        });
      };
    };

    const validateField = (field, callback) => {
      const rule = rules[field];
    };

    const validate = (callback) => {
      fields.forEach((field) => {});
    };

    return <Form getFieldDes={getFieldDesc} validate={validate} />;
  };
}

export default ZFormCreate;
