import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();
const DropdownProvider = (props) => {
  const [show, setShow] = useState(false);
  const toogle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toogle };
  return <DropdownContext.Provider value={values}>{props.children}</DropdownContext.Provider>;
};

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined") throw new Error("useDropdown must be used within DropdownProvider");
  return context;
};
export { useDropdown, DropdownProvider };
