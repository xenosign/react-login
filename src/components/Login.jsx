import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/modules/users";

export default function Login() {
  // REST API 키 입력
  const KAKAO_CLIENT_ID = "2be90ab71a1f36d735f12cd91b53a982";
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const userEmailInput = useRef();
  const userPasswordInput = useRef();

  const dispatch = useDispatch();

  async function loginUser() {
    const loginInfo = {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    };

    if (
      userEmailInput.current.value !== "" &&
      userPasswordInput.current.value !== ""
    ) {
      const response = await fetch("http://localhost:4000/users/login ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        if (result.result) {
          dispatch(login(result));
        }
      } else {
        throw new Error("로그인 실패");
      }
    } else {
      console.log("이메일 또는 아이디를 입력 하세요!");
    }
  }

  return (
    <div className="App">
      <span>EMAIL </span>
      <input ref={userEmailInput} />
      <br />
      <span>PW </span>
      <input ref={userPasswordInput} />
      <br />
      <button onClick={() => loginUser()}>로그인</button>
      <br />
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
    </div>
  );
}
