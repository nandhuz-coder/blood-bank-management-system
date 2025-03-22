import { useDispatch } from "react-redux";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { unwrapResult } from "@reduxjs/toolkit"; // ✅ Extracts payload properly

const useAuthService = () => {
    const dispatch = useDispatch();

    // ✅ Improved Login Function
    const handleLogin = async (e, email, password, role, navigate) => {
        e.preventDefault();

        if (!role || !email || !password) {
            return toast.error("Please provide all fields");
        }

        try {
            const resultAction = await dispatch(userLogin({ email, password, role }));
            const data = unwrapResult(resultAction); // ✅ Get API response safely

            toast.success("Login Successful!");

            // ✅ Redirect based on user role
            if (data.user?.role === "admin") navigate("/admin");
            else if (data.user?.role === "hospital") navigate("/hospital-dashboard");
            else navigate("/dashboard"); // Default

        } catch (error) {
            console.error(error);
            toast.error(error || "Login failed. Please try again.");
        }
    };

    // ✅ Improved Register Function
    const handleRegister = async (e, formData, navigate) => {
        e.preventDefault();

        if (!formData.name || !formData.role || !formData.email || !formData.password) {
            return toast.error("Please provide all required fields");
        }

        try {
            const resultAction = await dispatch(userRegister(formData));
            unwrapResult(resultAction); // ✅ Extract payload

            toast.success("Registration successful! Redirecting to login...");
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error(error || "Registration failed. Please try again.");
        }
    };

    return { handleLogin, handleRegister };
};

export default useAuthService;
