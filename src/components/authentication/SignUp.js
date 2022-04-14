import { ref, set } from "firebase/database";
import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { BsCheckCircleFill, BsExclamationTriangleFill } from "react-icons/bs";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { languages } from "../../contexts/languages";
import { database } from "../../firebase";
import LanguageSelect from "../ui/LanguageSelect";
import PoweredBy from "../ui/PoweredBy";
import { notify } from "../ui/toast";

const Signup = ({ language }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    passwordRef.current.value !== passwordConfirmRef.current.value &&
      notify(languages[language].singup.passwordNoMatch, "warn", "top-center");

    passwordRef.current.value.length < 6 &&
      notify(languages[language].singup.passwordMinChars, "warn", "top-center");

    try {
      setLoading(true);
      await toast.promise(
        signup(emailRef.current.value, passwordRef.current.value).then((e) => {
          set(ref(database, `settings/${e.user.uid}/`), {
            lang: language,
            email: e.user.email,
          });
        }),
        {
          pending: {
            render() {
              return languages[language].singup.wait;
            },
          },
          success: {
            render() {
              return languages[language].singup.accountCreated;
            },
            icon: <BsCheckCircleFill color="#28a745" />,
          },
          error: {
            render(e) {
              switch (e.data.code) {
                case "auth/email-already-in-use":
                  return languages[language].singup.mailInUse;
                default:
                  return languages[language].singup.failToCreate;
              }
            },
            icon: <BsExclamationTriangleFill color="#dc3545" />,
          },
        },
        {
          theme: "dark",
          autoClose: 2000,
          position: "top-center",
          hideProgressBar: true,
        }
      );
      navigate("/");
    } catch {}
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-dark">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <LanguageSelect onDarkBackground={false} />
        <ToastContainer />
        <Card className="bg-dark text-light shadow p-4">
          <Card.Body>
            <h2 className="text-center mb-4">
              {languages[language].singup.singup}
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="email"
                />
              </Form.Group>
              <Form.Group id="password" className="my-3">
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  placeholder={languages[language].singup.password}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                  placeholder={languages[language].singup.confirmPassword}
                />
              </Form.Group>
              <Button
                variant="outline-warning"
                disabled={loading}
                className="w-100 mt-3 "
                type="submit"
              >
                {languages[language].singup.singup}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          {languages[language].singup.alreadyHaveAccount}{" "}
          <Link to="/login">
            <b> {languages[language].singup.login}</b>
          </Link>
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(Signup);
