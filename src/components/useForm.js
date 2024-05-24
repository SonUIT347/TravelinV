import { useState, useEffect, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { omit } from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const baseURL = process.env.REACT_APP_API_BASE_URL 



const useForm = (callback) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [checkConfirmPw, setCheckConfirmPw] = useState();

  const [account, setAccount] = useState({
    role: "ROLE_USER"
  });

  const [errors, setErrors] = useState({});

  const [checkBox, setCheckBox] = useState();

  const [checkAccounts, setCheckAccount] = useState();

  useEffect(() => {
    const fecthCheckAccout = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/register/" + account.userName
        );
        setCheckAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    account.userName && fecthCheckAccout();
  }, [account.userName]);

  useEffect(() => {
    checkAccounts
      ? setErrors({ ...errors, checkExist: "Username already exists" })
      : setErrors(omit(errors, "checkExist"));
  }, [checkAccounts]);

  useEffect(() => {
    const CheckConfirmPw = () => {
      checkConfirmPw !== "" && checkConfirmPw !== account.password
        ? setErrors({
          ...errors,
          confirmPw: "Confirm Password must be the same as entered password.",
        })
        : setErrors(omit(errors, "confirmPw"));
    };
    checkConfirmPw ? CheckConfirmPw() : setErrors(omit(errors, "confirmPw"));
  }, [checkConfirmPw]);

  const handleChangeConfirmPw = (e) => {
    setCheckConfirmPw(e.target.value);
  };

  const handleCheckBox = () => {
    if (checkBox) setCheckBox();
    else {
      setCheckBox(true);
      setErrors(omit(errors, "checkBox"));
    }
  };

  const validate = (name, value) => {
    if (value) {
      switch (name) {
        case "userName":
          if (value.length <= 4) {
            setErrors({
              ...errors,
              userName: "Username atleast have 5 letters.",
            });
          } else {
            let newObj = omit(errors, "userName");
            setErrors(newObj);
          }
          break;

        case "name":
          if (value.length <= 4) {
            setErrors({
              ...errors,
              name: "Name atleast have 5 letters.",
            });
          } else {
            let newObj = omit(errors, "name");
            setErrors(newObj);
          }
          break;

        case "phoneNumber":
          if (value.length !== 10) {
            setErrors({
              ...errors,
              phoneNumber: "Phone number must have 10 digits",
            });
          } else {
            let newObj = omit(errors, "phoneNumber");
            setErrors(newObj);
          }
          break;

        case "gmail":
          if (
            !new RegExp(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(value)
          ) {
            setErrors({
              ...errors,
              gmail: "Enter a valid email address.",
            });
          } else {
            let newObj = omit(errors, "gmail");
            setErrors(newObj);
          }
          break;

        case "password":
          if (
            // !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
            value.length < 8
          ) {
            setErrors({
              ...errors,
              password: "Password should contains atleast 8 charaters.",
            });
          } else {
            let newObj = omit(errors, "password");
            setErrors(newObj);
          }
          break;

        default:
          break;
      }
    } else setErrors(omit(errors, name));
  };
  console.log(errors);

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
    validate(event.target.name, event.target.value);
  };

  const handleChangeLogin = (e) => {
    
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    
    setErrors(omit(errors, "login"));
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(account.imagePreview);
    };
  }, [account.image]);

  const handleImage = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(account).length !== 0 &&
        checkBox
      ) {
        console.log(account)
        await axios.post(`${baseURL}/user/addNewUser`, account);
        setUser((user) => {
          const newSetUser = { ...user, userName: account.userName };
          const jsonUser = JSON.stringify(newSetUser);
          localStorage.setItem("user", jsonUser);
          return newSetUser;
        });
        navigate("/Register/Profile");
      } else {
        !checkBox &&
          setErrors({
            ...errors,
            checkBox: "You must accepted with terms and conditions.",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      if (account.userName.length !== 0 && account.password.length !== 0) {
        const res = await axios.post(
          `${baseURL}/auth/login`, {
          username: account.userName,
          password: account.password
        }
        );
        if (res.data.status == 200) {
          user.token = res.data.jwttoken
          localStorage.setItem("accessToken" , res.data.jwttoken)
          axios
            .get(`${baseURL}/user/info`, { headers: {"Authorization" : `Bearer ${user.token}`} })
            .then((res) => {
              console.log(res.data.role)
              setUser((user) => {
                const newSetUser = {
                  ...user,
                  userName: res.data.username,
                  loggedIn: true,
                  accountType: res.data.role,
                  image: res.data.avatar,
                  id_user: res.data.id_user,
                  email:res.data.email
                };
                const jsonUser = JSON.stringify(newSetUser);
                localStorage.setItem("user", jsonUser);
                return newSetUser;
              });
            });
          navigate("/");
        } else {
          setErrors({ ...errors, login: "Incorrect username or password." });
        }
      }
    } catch (err) {
      console.log(err);
      setErrors({ ...errors, login: "Incorrect username or password." });
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        if (res.data.email_verified) {
          let objectAccount = {
            userName: res.data.email,
            password: res.data.sub,
            name: res.data.name,
            gmail: res.data.email,
            accountType: "user",
            avatar: res.data.picture,
          };
          await axios.post("http://localhost:8800/account", objectAccount);
          setUser((user) => {
            const newSetUser = {
              ...user,
              userName: res.data.email,
              loggedIn: true,
              image: res.data.picture,
            };
            const jsonUser = JSON.stringify(newSetUser);
            localStorage.setItem("user", jsonUser);
            return newSetUser;
          });
          navigate("/");
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleUpdateAccount = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      if (String(account.avatar) !== String(user.image)) {
        const uploadData = new FormData();
        uploadData.append("image", account.avatar, "image");
        uploadData.append("name", account.name);
        uploadData.append("gmail", account.gmail);
        uploadData.append("phoneNumber", account.phoneNumber);
        uploadData.append("gender", account.gender);
        axios.put(`http://localhost:8800/account/${user.userName}`, uploadData).then((res) => console.log(res.data));
      } else {
        axios.put(`http://localhost:8800/account/${user.userName}`, account).then((res) => console.log(res.data));
      }
    }
    navigate("/Login");
  };
  return {
    checkAccounts,
    user,
    account,
    errors,
    setAccount,
    handleChange,
    handleCreateAccount,
    handleChangeConfirmPw,
    handleCheckBox,
    handleChangeLogin,
    handelLogin,
    handleLoginGoogle,
    handleImage,
    handleUpdateAccount,
  };
};

export default useForm;
