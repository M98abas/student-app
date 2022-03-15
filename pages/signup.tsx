import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ApiRegister } from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { URL } from "../api";
import { message, Select } from "antd";
const register = () => {
  const { Option } = Select;
  const [email, setEmail]: any = useState("");
  const [name, setName]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [fields, setFields]: any = useState([]);
  const [courseId, setCourseId]: any = useState([]);
  const router: any = useRouter();
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/course/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("res", result.data);
        setFields(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  // })
  //   fields.map((field: any) => console.log(field));

  const handleRegister = (e: any) => {
    e.preventDefault();
    ApiRegister(
      { email, name, password, courseId },
      (data: any, error: any) => {
        console.log(data);

        if (data.errMsg) return message.error(data.errMsg);
        Cookies.set("registerToken", data.token);
        router.push("/login");
      }
    );
  };
  function handleChange(value: any) {
    setCourseId(value);
  }
  // console.log(fields);

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="right-side">
          <form onSubmit={handleRegister}>
            <p className="label">Email</p>
            <input
              required
              placeholder="Example@something.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <p className="label">name</p>
            <input
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <p className="label">Password</p>
            <input
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button type="submit">Sign Up</button>
            <div
              className="links-container"
              style={{ marginTop: 10, alignSelf: "center" }}
            >
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="sign-up-link">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
