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
      // Store the response data properly
      const adminData = response.data?.data;

      const cookieData = {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        token: adminData.token,
      };

      Cookies.set("adminData", JSON.stringify(cookieData), { expires: 7 });
      Cookies.set("token", adminData.token, { expires: 7 });
      router.push("/admin/dashboard");
      toast.success("Login successful!", { id: toastId });
    } catch (error: any) {
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
