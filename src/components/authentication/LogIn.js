import React, { useRef, useState } from "react";
import { Form, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { BiShow, BiHide, BiLogIn } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
// import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import "../../contexts/languages";
import { languages } from "../../contexts/languages";
import { database } from "../../firebase";
import { ref, update } from "firebase/database";
import LanguageSelect from "../ui/LanguageSelect";
import PoweredBy from "../ui/PoweredBy";
import { notify } from "../ui/toast";

const Login = ({ language }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle, signInWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
      return;
    } catch {
      notify(languages[language].login.loginFail, "warn", "top-center");
    }
    setLoading(false);
  };

  const handleGoogleLogIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithGoogle().then(async (e) => {
        if (e._tokenResponse.hasOwnProperty("isNewUser")) {
          await update(ref(database, `settings/${e.user.uid}/`), {
            lang: language,
            email: e.user.email,
          }).then(() => navigate("/"));
        } else {
          navigate("/");
        }
      });
      return;
    } catch (e) {
      e.code !== "auth/popup-closed-by-user" &&
        notify(languages[language].login.loginFail, "warn", "top-center");
    }
    setLoading(false);
  };

  const handleFacebookLogIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithFacebook().then(async (e) => {
        if (e._tokenResponse.hasOwnProperty("isNewUser")) {
          await update(ref(database, `settings/${e.user.uid}/`), {
            lang: language,
            email: e.user.email,
          }).then(() => navigate("/"));
        } else {
          navigate("/");
        }
      });
      return;
    } catch (e) {
      e.code !== "auth/popup-closed-by-user" &&
        notify(languages[language].login.loginFail, "warn", "top-center");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-dark">
      <ToastContainer />
      <div className="w-100 " style={{ maxWidth: "400px" }}>
        <Card className="bg-dark text-light shadow p-4">
          <Card.Body>
            <h2 className="text-center mb-4">
              {languages[language].login.login}
            </h2>
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="email"
                />
              </Form.Group>
              <InputGroup className="my-3" id="password">
                <FormControl
                  type={passwordShown ? "text" : "password"}
                  ref={passwordRef}
                  required
                  placeholder={languages[language].login.password}
                />
                <Button
                  variant="light removeFocus"
                  onClick={togglePassword}
                  // data-tip={passwordShown ? "Hide" : "Show"}
                  // data-for="pwshow"
                >
                  {passwordShown ? <BiHide /> : <BiShow />}
                </Button>
              </InputGroup>
              <Button
                disabled={loading}
                className="w-100 hoverIconAnimation-s"
                type="submit"
                variant="warning"
              >
                <b>{languages[language].login.login}</b>{" "}
                <BiLogIn className="" />
              </Button>
            </Form>
            <div className="text-center my-3">
              {languages[language].login.or}
            </div>
            <Button
              variant="outline-light hoverIconAnimation-s"
              disabled={loading}
              className="w-100"
              onClick={handleGoogleLogIn}
            >
              {languages[language].login.signinWith} <FcGoogle />
            </Button>
            <Button
              variant="outline-light hoverIconAnimation-s"
              disabled={loading}
              className="w-100 my-3"
              onClick={handleFacebookLogIn}
            >
              {languages[language].login.signinWith} <BsFacebook />
            </Button>
            <div className="w-100 text-center mt-3 ">
              <Link to="/forgot-password" className="link-light">
                {languages[language].login.forgotPassword}
              </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          {languages[language].login.needAccount}{" "}
          <Link to="/signup">
            <b> {languages[language].login.singup}</b>
          </Link>
        </div>
      </div>
      <LanguageSelect onDarkBackground={false} />
      <PoweredBy />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(Login);
