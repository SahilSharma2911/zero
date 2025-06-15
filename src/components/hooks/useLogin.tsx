/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface LoginFormProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormProps) => {
    const toastId = toast.loading("Logging in...");
    try {

      const response = await axios.post(
        "https://task-management-backend-kohl-omega.vercel.app/api/auth/login-company-admin",
        data
      );

      const cookieData = response.data?.data;

      console.log("login data is here",cookieData)

      const cookieData = {
        id: cookieData.id,
        name: cookieData.name,
        email: cookieData.email,
        token: cookieData.token,
        role: cookieData.role,
      };

      Cookies.set("cookieData", JSON.stringify(cookieData), { expires: 7 });
      Cookies.set("token", cookieData.token, { expires: 7 });
      router.push("/admin/dashboard");
      toast.success("Login successful!", { id: toastId });


    } catch (error:any) {
      let errorMessage = "Login failed";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast.error(errorMessage, { id: toastId });
    }
  };

  return {
    adminInfo: {
      register,
      handleSubmit,
      errors,
      isSubmitting,
      onSubmit,
    },
  };
};

export default useLogin;
