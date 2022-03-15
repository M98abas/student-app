import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { URL } from "../api";

const Card = ({ id, title, question }: any) => {
  // const router = useRouter();
  const setData: any = (idC: any) => {
    Cookies.set("courseId", idC);
    // getOne
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
    fetch(`${URL}/course/getOne/${idC}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="card" key={id}>
      <div className="headers">
        <img className="img-exam" src="test.png" alt="" />
      </div>
      <div className="content">
        <h4 className="question">Course {question}</h4>
      </div>
      <a href={`/${id}`} onClick={setData(id)} className="submit">
        Enter to the Exam
      </a>
    </div>
  );
};

export default Card;
