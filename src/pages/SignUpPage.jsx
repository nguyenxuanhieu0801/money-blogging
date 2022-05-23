import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import * as yup from "yup";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input } from "../components/input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { Label } from "../components/label";
import { auth, db } from "../firebase-app/firebase-config";
import { userRole, userStatus } from "../utils/constants";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().email("Please enter valid email address").required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors > 0) {
      toast.error(arrayErrors[0].message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: "",
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });

    toast.success("Register successfully!!!");
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
        <Field>
          <Label htmlFor="fullname">Full Name</Label>
          <Input name="fullname" type="text" placeholder="Enter your fullname" control={control} />
        </Field>
        <Field>
          <Label htmlFor="email">
            Email <address></address>
          </Label>
          <Input name="email" type="email" placeholder="Enter your email" control={control} />
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control} />
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
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
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
