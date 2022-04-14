import { Circles } from "react-loader-spinner";

const Spinner = ({ colorSpin, height, width, classColor }) => {
  //other logic
  return (
    <Circles
      // className={
      //   "text-center h-100 w-100 d-flex align-content-center justify-content-center align-items-center"
      // }
      // type="Circles"
      color={colorSpin}
      height={height === undefined ? 100 : height}
      width={width === undefined ? 100 : width}
      //   timeout={3000} //3 secs
    />
  );
};

export default Spinner;
