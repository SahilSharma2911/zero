"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import useLogin from "./hooks/useLogin";

const LoginForm = () => {
  //-------------customHook ---------------

  const { adminInfo } = useLogin();

  const handleSubmit = adminInfo?.handleSubmit;
  const register = adminInfo?.register;
  const errors = adminInfo?.errors;
  const onSubmit = adminInfo?.onSubmit;
  const isSubmitting = adminInfo?.isSubmitting;

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 shadow-lg p-8 space-y-4 rounded-md my-5 w-full max-w-md"
      >
        <h2 className="text-center text-xl font-Inter font-bold">
          Admin Login
        </h2>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Enter your email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Enter your password"
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password?.message}
            </span>
          )}
        </div>

        <div className="flex justify-center items-center pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
