import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { LoadingSpinner } from "../loading";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  border-radius: 8px;
  font-weight: 600;
  font-style: 18px;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({ type = "button", onClick = () => {}, kind = "primary", children, ...props }) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }

  return (
    <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
