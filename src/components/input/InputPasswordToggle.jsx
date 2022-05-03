import { useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return;

  return (
    <>
      <Input
        name="password"
        type={togglePassword ? "text" : "password"}
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)} />
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)} />
        )}
      </Input>
    </>
  );
};

export default InputPasswordToggle;
