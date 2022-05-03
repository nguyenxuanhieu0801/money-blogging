import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.primary};
    font-weight: bold;
  }
  .form {
    max-width: 800px;
    margin: 0px auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyle>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="money-blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Money Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyle>
  );
};

export default AuthenticationPage;
