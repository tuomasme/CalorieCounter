const NavBar = ({ onOpen }) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start"></div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <a className="btn btn-primary" onClick={onOpen}>
            Add meal
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
