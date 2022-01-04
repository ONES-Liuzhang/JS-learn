import React from "react";
import ZFormCreate from "./ZFormCreate";

export function ZForm(props) {
  const { getFieldDes, validate } = props;

  const onSubmit = () => {
    validate((isValid, data) => {
      if (isValid) {
        console.log(`登录成功：${data}`);
      } else {
        alert(data.message);
      }
    });
  };

  return (
    <div>
      <div>
        <div>账号：</div>
        {getFieldDes("uname", {
          rules: [{ required: true, message: "请输入账号" }],
        })(<input />)}
      </div>

      <div>
        <div>密码：</div>
        {getFieldDes("pwd", {
          rules: [{ required: true, message: "请输入密码" }],
        })(<input />)}
      </div>
      <button onClick={onSubmit}>提交表单</button>
    </div>
  );
}

export default ZFormCreate(ZForm);
