export const Loader = ({ width }) => {
  return (
    <img
      className="loader"
      style={{ width }}
      src={require("../../assets/imgs/loader.gif")}
      alt=""
    />
  );
};
