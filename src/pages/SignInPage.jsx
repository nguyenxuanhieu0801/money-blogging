import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input } from "../components/input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { Label } from "../components/label";
import { useAuth } from "../contexts/auth-context";
import { auth } from "../firebase-app/firebase-config";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  email: yup.string().email("Please enter valid email address").required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
  }, [userInfo]);

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors > 0) {
      toast.error(arrayErrors[0].message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
        <Field>
          <Label htmlFor="email">
            Email <address></address>
          </Label>
          <Input name="email" type="email" placeholder="Enter your email" control={control} />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control} />
        </Field>
        <div className="have-account">
          You have not had an account? <NavLink to={"/sign-up"}>Register an account</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
