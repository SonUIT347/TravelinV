import React, { useState, useContext, useEffect } from "react";
import "../Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../image/loginImage.png";
import { FcGoogle } from "react-icons/fc";
import useForm from "../components/useForm";
import Errs from "../components/errors";
import { Link } from "react-router-dom";

function Login() {
  const {
    user,
    handleChangeLogin,
    errors,
    account,
    setAccount,
    handelLogin,
    handleLoginGoogle,
  } = useForm();

  useEffect(() => {
    setAccount({ ...account, userName: user.userName });
  }, []);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const handelToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };
  return (
    <div className="login-container">
      <img src={loginImage} height="auto" />
      <div className="signin">
        <div>
          <h1 className="A0">Welcome Back</h1>
        </div>
        <div className="flex1">
          <p className="A1">Don't have account?</p>
          <Link to="/Register" className="A2">
            Register
          </Link>
        </div>
        <div>
          <form>
            <div className="Info">
              <p className="useDis">Usename</p>
              <input
                type="text"
                placeholder="Enter your usename"
                defaultValue={account.userName}
                name="userName"
                onChange={handleChangeLogin}
                required
              ></input>
              <p className="passDis">Password</p>
              <div className="Input">
                <input
                  type={passwordType}
                  placeholder="Enter your password"
                  name="password"
                  defaultValue={account.password}
                  onChange={handleChangeLogin}
                  required
                ></input>
                <span className="icons-span" onClick={handelToggle}>
                  {passwordIcon}
                </span>
              </div>
            </div>
            <div class="flex2">
              <input type="checkbox"></input>
              <p class="A3">Remember me</p>
              <p class="A4">Forgot Password</p>
            </div>
            {errors.login && <Errs err={errors.login} />}
            <input
              type="submit"
              value="Sign in"
              class="IP1"
              onClick={handelLogin}
            ></input>
            <p class="A5">Or</p>
          </form>

          <div class="icon1">
            <input
              type="submit"
              value="Sign in with Google"
              class="IP2"
              onClick={handleLoginGoogle}
            ></input>
            <FcGoogle  className="icon-gg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
