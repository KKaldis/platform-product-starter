import React, { useEffect } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import Logo from "../../assets/logo.svg";
import { languages } from "../../contexts/languages";
import {
  hideSideToggled,
  modalToggle,
  sideViewChanged,
} from "../../redux/actions";

const NavBar = ({
  sideView,
  handleChanges,
  showSide,
  handleHideSideToggle,
  handleModal,
  showAbout,
  length,
  language,
}) => {
  // console.log(sideView);
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [showSide]);

  return (
    <div className="border-end vh-100 text-light bg-dark p-3 d-flex align-items-start flex-column border-end ">
      <button
        className={`btn btn-outline-light btn 
        d-flex align-items-center justify-content-center
        align-content-center p-3
        ${sideView === "Welcome" && "active"}`}
        type="button"
        data-tip={languages[language].nav.home}
        data-for="nav"
        onClick={handleChanges("Welcome")}
      >
        <BsQuestionDiamondFill className="pe-none" />
      </button>

      <button
        className={`btn btn-outline-light btn my-3 h-100 w-100`}
        // data-tip={showSide ? "Hide" : "Show"}\
        data-tip
        data-for="toggle"
        onClick={handleHideSideToggle}
        value={showSide}
        disabled={
          sideView === "Statistics" || sideView === "Account Settings"
            ? true
            : false
        }
      >
        {showSide ? (
          <BiArrowToLeft className="pe-none" />
        ) : (
          <BiArrowToRight className="pe-none" />
        )}
      </button>

      <button
        className={`btn btn-outline-light btn 
        d-flex align-items-center justify-content-center
        align-content-center p-3
        ${sideView === "Account Settings" && "active"}`}
        data-tip={languages[language].nav.accountSettings}
        data-for="nav"
        onClick={handleChanges("Account Settings")}
      >
        <FaUserCog className="pe-none" />
      </button>
      <div className="d-flex flex-column py-2 w-100">
        <a href="#" className="w-100 " value={showAbout} onClick={handleModal}>
          <img
            src={Logo}
            alt={process.env.REACT_APP_COMPANY}
            className="pe-none"
          />
        </a>
        <p
          className="font-weight-light text-center m-0"
          style={{ fontSize: "0.5rem" }}
        >
          powered by
        </p>
      </div>
      <ReactTooltip effect="solid" type="info" place="right" id="nav" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  handleChanges: (view) => () => dispatch(sideViewChanged(view)),
  handleHideSideToggle: (e) => dispatch(hideSideToggled(e.target.value)),
  handleModal: (e) => dispatch(modalToggle(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
