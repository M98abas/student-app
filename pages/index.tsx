import type { NextPage } from "next";
import RouteProtect from "../HOC/routerProtect";
import { useState, useEffect } from "react";
import { URL } from "../api";
import { Button, Spin } from "antd";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const Home: NextPage = () => {
  const Router = useRouter();
  Cookies.set("score", JSON.stringify(0));
  Cookies.set("page", JSON.stringify(10));
  const [exams, setExams]: any = useState([]);
  const [courses, setCourses]: any = useState([]);
  let examId: any = Cookies.get("quesions") ? Cookies.get("quesions") : [];
  useEffect(() => {
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    // myHeaders.append("pages", pageCookie);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    // var raw = JSON.stringify({ field });
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/course/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCourses(result.data);

        // Router.push(`/${result.rows[0].id}`);
      })
      .catch((error) => console.log("error", error));
  }, []);
  // let num;
  if (!examId) {
    exams.map((e: any) => examId.push(e.id));
  }
  // const paging: any = exams.length;
  Cookies.set("quesions", String(examId));
  // console.log("Pages", paging);
  // const handelClick = () => {
  //   let score: any = Cookies.get("score");
  //   // score = parseInt(score);
  //   const token: any = Cookies.get("token");
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("token", token);
  //   // myHeaders.append("token", score);
  //   var raw = JSON.stringify({ score });
  //   var requestOptions: any = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${URL}/question/student/answer`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setExams(result.rows);
  //     })
  //     .catch((error) => console.log("error", error));
  //   Router.push("/score");
  // };

  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Exam">
          <div className="home-content">
            {courses ? (
              courses.map((e: any) => (
                // console.log(e)
                // <PureCard key={e.id} item={e} link="/subexam" />
                <Card key={e.Cid} id={e.Cid} title={e.Cid} question={e.name} />
              ))
            ) : (
              <Spin className="spinner" size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;
