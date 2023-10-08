import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { pictureCode } from "@item/api";

const style = {
  display: "block",
  width: "90px",
  height: "38px",
};

// 图形验证码
const PictureCode = (props) => {
  const submitStatus = useSelector((state) => state.submitStatus);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // 获取图形验证码
  const getData = async () => {
    setLoading(true);
    try {
      const {
        data: { id_key, base64_code },
      } = await pictureCode();
      setUrl(base64_code);
      props.onChange(id_key);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submitStatus && loading) {
      getData();
    } else if (!submitStatus && !loading) {
      getData();
    }
  }, [submitStatus]);

  return (
    <span style={style}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingOutlined
            style={{
              fontSize: 20,
            }}
            spin
          />
        </div>
      )}

      {url && (
        <a
          onClick={getData}
          style={{
            ...style,
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></a>
      )}
      {!loading && !url && (
        <a onClick={getData} style={{ ...style, fontSize: "12px" }}>
          失败,重新加载
        </a>
      )}
    </span>
  );
};

export default PictureCode;
