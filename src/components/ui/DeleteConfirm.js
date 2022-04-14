import React from "react";
import { motion } from "framer-motion";
import { Button, Form, Row, Col, Card, ButtonGroup } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { languages } from "../../contexts/languages";
import { connect } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { IoWarningOutline } from "react-icons/io5";

const DeleteConfirm = ({
  object,
  openDeleteModal,
  setOpenDeleteModal,
  deletefunction,
  language,
}) => {
  const variants = {
    open: { opacity: 1, zIndex: "2", pointerEvents: "auto" },
    closed: {
      opacity: 0,
      zIndex: "2",
      pointerEvents: "none",
    },
  };

  const handleDelete = () => {
    setOpenDeleteModal(false);
    deletefunction();
  };

  return (
    <>
      {openDeleteModal && (
        <motion.div
          variants={variants}
          initial="closed"
          exit="closed"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          animate="open"
          className="Overlay"
        >
          <div className="Modal" style={{ maxWidth: "100" }}>
            <div className="justify-content-center align-items-center bg-dark rounded shadow">
              <div className="w-100 " style={{ maxWidth: "500px" }}>
                <Card className="bg-dark text-light shadow p-5 border border-warning rounded">
                  <Card.Body>
                    <Button
                      onClick={() => setOpenDeleteModal(false)}
                      variant="outline-warning"
                      className="removeImage shadow"
                    >
                      <AiOutlineClose />
                    </Button>
                    <div className="text-center text-light">
                      <h4>
                        <b>{languages[language].confirmBox.areYouSure}</b>
                      </h4>
                      <div className="py-4">
                        <IoWarningOutline fontSize={"4rem"} />
                      </div>

                      <h5>{languages[language].confirmBox.noUndo}</h5>
                    </div>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: "transparent",
                      borderBlockColor: "transparent",
                    }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <ButtonGroup className="w-100">
                        <Button
                          variant="outline-warning hoverIconAnimation-s "
                          onClick={handleDelete}
                          onClick={() => setOpenDeleteModal(false)}
                        >
                          {languages[language].confirmBox.cancel}
                          <GiCancel className="ms-1" />
                        </Button>

                        <Button
                          variant="outline-danger hoverIconAnimation-s "
                          onClick={handleDelete}
                        >
                          {languages[language].confirmBox.delete}
                          <BsFillTrashFill className="ms-1" />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirm);
