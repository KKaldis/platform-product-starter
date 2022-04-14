import React from "react";
import { Dropdown } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";
import { changeLanguage } from "../../redux/actions";
import { connect } from "react-redux";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const LanguageSelect = ({
  language,
  handleChangeLanguage,
  onDarkBackground,
}) => {
  const { currentUser } = useAuth();

  const changeDBLang = (language) => {
    currentUser &&
      update(ref(database, `settings/${currentUser.uid}`), { lang: language });
  };

  return (
    <div className="position-absolute" style={{ right: "1rem", top: "1rem" }}>
      <Dropdown>
        <Dropdown.Toggle
          style={{
            color: `${onDarkBackground ? "white" : "black"}`,
            backgroundColor: "transparent",
          }}
          className="removeFocus border-0"
        >
          {language === "English" ? (
            <>
              <Flags.GB
                title="English"
                style={{ width: 25, height: 25, borderRadius: 25 }}
              />
            </>
          ) : (
            <>
              <Flags.GR
                title="Ελληνικά"
                style={{ width: 25, height: 25, borderRadius: 25 }}
              />
            </>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item
            onClick={handleChangeLanguage("English", changeDBLang)}
            className="d-flex align-items-center"
          >
            <Flags.GB
              title="United States"
              className="me-3"
              style={{ width: 25, height: 25, borderRadius: 25 }}
            />
            English
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleChangeLanguage("Ελληνικά", changeDBLang)}
            className="d-flex align-items-center"
          >
            <Flags.GR
              title="Greece"
              className="me-3"
              style={{ width: 25, height: 25, borderRadius: 25 }}
            />
            Ελληνικά
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeLanguage: (lang, changeDBLang) => () => {
    dispatch(changeLanguage(lang));
    changeDBLang(lang);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
