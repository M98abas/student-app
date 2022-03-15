import type { NextPage } from "next";
import RouteProtect from "../../HOC/routerProtect";
import { useState, useEffect } from "react";
import { URL } from "../../api";
import { Spin } from "antd";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Home: NextPage = () => {
  const Router = useRouter();
  const [ids, setIds]: any = useState(0);
  useEffect(() => {
    setIds(Router.query);
  }, [Router]);
  let id: any;
  if (ids.id != NaN) {
    id = parseInt(ids.id);
  }

  const [exams, setExams]: any = useState([]);

  let examId: any = Cookies.get("quesions") ? Cookies.get("quesions") : [];
  useEffect(() => {
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    // myHeaders.append("pages", pageCookie);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    // console.log(id);
    myHeaders.append("courseId", id);
    // var raw = JSON.stringify({ field });
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/question/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        Router.push(`/exam/${result.answers[0].Qid}`);
      })
      .catch((error) => console.log("error", error));
  }, [Router, ids.id]);
  // let num;
  if (!examId) {
    exams.map((e: any) => examId.push(e.id));
  }
  // const paging: any = exams.length;
  Cookies.set("quesions", String(examId));
  // console.log("Pages", paging);
  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Exam">
          <div className="home-content">
            {exams ? (
              exams.map((e: any) => (
                // console.log(e)
                // <PureCard key={e.id} item={e} link="/subexam" />
                <Card key={e.id} id={e.id} title={e.id} question={e.question} />
              ))
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;
