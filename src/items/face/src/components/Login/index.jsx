import React, { useContext, useEffect } from "react";
import { TokenContext } from "@store/context";

// const appName = process.env.NODE_APP_NAME; //产品名称

const Login = (props) => {
  const token = useContext(TokenContext);

  console.log(token)
  // const dispatch = useDispatch();
  // const submitStatus = useSelector((state) => state.submitStatus);
  // const authToken = useSelector((state) => state.authToken);

  return (
    <div className="d-flex align-center flex-column login-page">
      <div className="flex-1 d-flex align-center justify-center flex-column content"></div>
      <p className="sub-title">当前版本号: 1.0.0</p>
    </div>
  );
};

export default Login;
