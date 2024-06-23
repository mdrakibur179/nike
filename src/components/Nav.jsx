import headerLogo from "../assets/images/header-logo.svg";
// import hamburger from "../assets/icons/hambuger.svg";

const Nav = () => {
  return (
    <header>
      <nav>
        <a href="#">
          <img src={headerLogo} alt="headerLogo" width={130} height={29} />
        </a>
      </nav>
    </header>
  );
};

export default Nav;
