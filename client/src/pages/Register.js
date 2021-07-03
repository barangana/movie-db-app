import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../constants/validation";

/**
 * Register page
 * Calls the backend and allows the user to register.
 */
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitForm = (data) => {
    console.log(data);
    const { email, username, password } = data;
    Axios.post("/user/register", {
      username: username,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          {...register("username", { required: true })}
        />
        <p>{errors.username?.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          {...register("confirmPassword", { required: true })}
        />
        <p>{errors.confirmPassword && "Passwords must match"}</p>
        <input type="submit" id="submit" />
      </form>
    </div>
  );
}

export default Register;
