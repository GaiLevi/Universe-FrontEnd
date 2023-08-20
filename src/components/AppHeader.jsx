export const AppHeader = () => {
  return (
    <section className="app-header secondary-bg">
      <div className="logo-container">
        <img
          className="logo"
          src={require("../assets/imgs/logo.svg").default}
          alt="logo-img"
        />
        <h1 className="title">Universe</h1>
      </div>
    </section>
  );
};
