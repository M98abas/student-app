import { PageHeader, Button, Tooltip } from "antd";
import { useRouter } from "next/router";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { URL } from "../api";

const MainLayout = ({ children, title, hasBack, subTitle }: any) => {
  const Router = useRouter();
  const [leftAnswers, setLeftAnswers]: any = useState(0);
  // const [timeing, setTiming] = useState(new Date().getTime());
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Router.push("/login");
  };
  const handelCartClick = () => {
    Router.push("/orders");
  };

  const hoursMinSecs = { hours: 1, minutes: 0, seconds: 0 };
  const { hours = 0, minutes = 0, seconds = 60 }: any = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  // If time is up
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      let score: any = Cookies.get("score");
      // score = parseInt(score);
      const token: any = Cookies.get("token");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", token);
      // myHeaders.append("token", score);
      var raw = JSON.stringify({ score });
      var requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${URL}/question/student/answer`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.rows);
          Cookies.remove("score");
          // ();
        })
        .catch((error) => console.log("error", error));
      Router.push("/score");
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };
  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <>
      {hasBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={`${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
          onBack={() => Router.back()}
          extra={[
            <Tooltip title="goto Cart">
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<ShoppingCartOutlined />}
                onClick={handelCartClick}
              />
            </Tooltip>,
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
            // <Popover trigger="click" placement="bottom" content={content}>
            //   <Avatar size="large" icon={<UserOutlined />} />
            // </Popover>,
          ]}
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={`${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
          extra={[
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
          ]}
        />
      )}

      <div className="container">
        <h1 className="title-of-exam">
          Exam of <span className="field">{subTitle} </span>
          Course
        </h1>

        {children}
      </div>
    </>
  );
};

export default MainLayout;
