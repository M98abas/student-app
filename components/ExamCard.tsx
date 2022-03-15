import { Button, message, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { URL } from "../api";
const ExamCard = ({ answers }: any) => {
  let courseId: any = Cookies.get("courseId");
  let oldScore: any = Cookies.get("score") ? Cookies.get("score") : 0;
  // Cookies.remove("score");
  oldScore = parseInt(oldScore);
  // console.log("me", answers);
  const Router = useRouter();
  let pages: any = Cookies.get("page") ? Cookies.get("page") : null;
  const [score, setScore]: any = useState(oldScore);
  const [newId, setNewId]: any = useState(0);
  const [answer, setAnsert]: any = useState();
  let demoScore = score;
  // console.log(answers);
  // const handelNextClick:any;
  // useEffect(() => {
  // }, [answer]);
  // // console.log();

  // console.log(newId);
  pages = parseInt(pages);
  const handelClick = () => {
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
    fetch(`${URL}/question/${parseInt(courseId)}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewId(result.answers[0].Qid);
        console.log("this is com ", result);

        // Router.push(`/${result.rows[0].id}`);
      })
      .catch((error) => console.log("error", error));
    pages -= 1;
    Cookies.set("page", pages);
    // log
    // console.log(answers[0].truth_answer, "|||", answer);
    if (answer == answers[0].truth_answer) {
      demoScore += 10;
      Cookies.set("score", demoScore);
      let counter: any = Cookies.get("page");
      counter = parseInt(counter) - 1;
      Cookies.set("page", JSON.stringify(counter));

      Router.push(`/exam/${newId}`);
    } else {
      Router.push(`/exam/${newId}`);
    }
  };
  const handelFinishClick = () => {
    let score: any = Cookies.get("score");

    // score = parseInt(score);
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    // myHeaders.append("token", score);
    var raw = JSON.stringify({ score, courseId });
    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${URL}/question/student/answer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Cookies.remove("score");
        // ();
      })
      .catch((error) => console.log("error", error));
    Router.push(`/score/${parseInt(courseId)}`);
  };
  return (
    <div className="container exam-content">
      <h3 className="question">Q : {answers[0].question} ?</h3>
      <div className="content-radio">
        <Radio.Group size="large">
          <Space direction="vertical">
            {answers.map((e: any) => (
              <>
                <Radio
                  onChange={() => {
                    // if (e.aswers == question[0].truthAnswer) {
                    setAnsert(e.aswers);
                    // }
                  }}
                  value={e.aswers}
                >
                  {e.aswers}
                </Radio>
              </>
            ))}
          </Space>
        </Radio.Group>
      </div>
      {pages == 0 ? (
        <Button
          className="btn-submit"
          onClick={handelFinishClick}
          type="primary"
        >
          finish
        </Button>
      ) : (
        <Button className="btn-submit" onClick={handelClick} type="primary">
          Next
        </Button>
      )}
    </div>
  );
};
export default ExamCard;
