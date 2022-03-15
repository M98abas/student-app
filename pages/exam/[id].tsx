import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { URL } from "../../api";
import { Spin } from "antd";
import ExamCard from "../../components/ExamCard";
import RouteProtect from "../../HOC/routerProtect";
import MainLayout from "../../components/MainLayout";
import Cookies from "js-cookie";
const exam = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const courseId = Cookies.get("courseId");

  const [ids, setIds]: any = useState(0);
  useEffect(() => {
    // console.log(router.query);

    setIds(router.query);
  }, [router]);
  let id: any;
  if (ids) {
    // console.log(id);

    id = parseInt(ids.id);
  }

  // console.log("ID", id);
  const [field, setField]: any = useState("");
  const [answers, setAnswers]: any = useState([]);
  const [question, setQuestion]: any = useState([]);
  // useEffect(() => {

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
    fetch(`${URL}/question/${courseId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setField(result.field);
        setAnswers(result.answers);
        setLoading(true);
        console.log("this is exam", result);
      })
      .catch((error) => console.log("error", error));
  }, [router]);
  const val = field
    ? field.map((e: any) => {
        return e.name;
      })
    : null;

  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle={val}>
          <div className="content-exam">
            {loading ? (
              <ExamCard answers={answers} question={question} />
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};
export default exam;
