import React from "react";
import { useState } from "react";
import "../Register.css";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import loginImage from "../image/loginImage.png";
import { FcGoogle } from "react-icons/fc";
import useForm from "../components/useForm";
import Errs from "../components/errors";
import { Link } from "react-router-dom";

function Register() {
  const {
    handleChange,
    handleCreateAccount,
    errors,
    handleChangeConfirmPw,
    handleCheckBox,
    handleLoginGoogle,
  } = useForm();

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

  const [confirmPasswordType, setPasswordTypeCon] = useState("password");
  const [passwordIconCon, setPasswordIconCon] = useState(<FaEyeSlash />);
  const handelToggleCon = () => {
    if (confirmPasswordType === "password") {
      setPasswordTypeCon("text");
      setPasswordIconCon(FaEye);
    } else {
      setPasswordTypeCon("password");
      setPasswordIconCon(FaEyeSlash);
    }
  };

  return (
    <div className="register-container">
      <img src={loginImage} height="auto" />
      <div class="register">
        <div>
          <h1 class="A0">Let get your Started</h1>
        </div>
        <div class="flex1">
          <p class="A1">Already have an account?</p>
          <Link to = '/Login'class="A2">Login</Link>
        </div>
        <div>
          <form>
            <div class="Info">
              <p class="useDis">Usename</p>
              <input
                type="text"
                placeholder="Enter your usename"
                name="username"
                onChange={handleChange}
                required
              ></input>
              {errors.checkExist && <Errs err={errors.checkExist} />}
              {errors.userName && <Errs err={errors.userName} />}
              <p class="passDis">Password</p>
              <div class="Input">
                <input
                  type={passwordType}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  required
                ></input>
                <span className="icons-span-1" onClick={handelToggle}>
                  {passwordIcon}
                </span>
                {errors.password && <Errs err={errors.password} />}
              </div>
              <p class="confDis">Confirm Password</p>
              <div class="InputCon">
                <input
                  type={confirmPasswordType}
                  placeholder="Confirm your password"
                  onChange={handleChangeConfirmPw}
                  required
                ></input>
                <span className="icons-span-2" onClick={handelToggleCon}>
                  {passwordIconCon}
                </span>
                {errors.confirmPw && <Errs err={errors.confirmPw} />}
              </div>
            </div>
            <div class="flex2">
              <input type="checkbox" required onClick={handleCheckBox}></input>
              <p class="A3">I accepted with terms and conditions</p>
            </div>
            {errors.checkBox && <Errs err={errors.checkBox} />}
            <input
              type="submit"
              value="Sign up"
              class="IP1"
              onClick={handleCreateAccount}
            ></input>
            <p class="A5">Or</p>
          </form>
          <input
            type="submit"
            value="Sign in with Google"
            class="IP2"
            onClick={handleLoginGoogle}
          ></input>
          <div class="icon">
            <FcGoogle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
