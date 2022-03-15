import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Cookies from "js-cookie";
import { URL } from "../../api";
import Confetti from "react-confetti";
import { useRouter } from "next/router";

const score = () => {
  const [scoreExam, setScoreExam]: any = useState();
  const Router = useRouter();

  let courseId: any = Cookies.get("courseId");

  useEffect(() => {
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/question/score/${parseInt(courseId)}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("res", result.score[0]);
        setScoreExam(result.score[0]);
        // Cookies.remove("token");
      })
      .catch((error) => console.log("error", error));
  }, [Router]);

  return (
    <>
      <MainLayout title="Score" subTitle="Final Score">
        <div className="container">
          <div className="content-score">
            <div className="sub-content">
              <h2 className="title">
                {scoreExam ? (
                  // scoreExam.map((e: any) =>
                  scoreExam.score >= 50 ? (
                    <>
                      <Confetti />
                      <span className="score-parts">The final Score is :</span>
                      <p className="score">{scoreExam.score}</p>
                      <p className="good-work">Nice You done </p>
                    </>
                  ) : (
                    <>
                      <span className="score-parts failer">
                        The final Score is :
                      </span>
                      <p className="score failer">{scoreExam.score}</p>
                    </>
                  )
                ) : (
                  <span className="score-parts">
                    There is no Score for you !!!
                  </span>
                )}
              </h2>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default score;
