import { useDispatch } from "react-redux";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useAuthService = () => {
    const dispatch = useDispatch();

    const handleLogin = async (e, email, password, role, navigate) => {
        e.preventDefault();

        if (!role || !email || !password) {
            return toast.error("Please Provide all Fields");
        }

        try {
            const result = await dispatch(userLogin({ email, password, role }));

            if (userLogin.fulfilled.match(result)) {
                toast.success("Login Successful!");
                setTimeout(() => navigate("/admin"), 1000);
            } else {
                toast.error(result.payload || "Login failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleRegister = async (e, formData, navigate) => {
        e.preventDefault();

        if (!formData.name || !formData.role || !formData.email || !formData.password) {
            return toast.error("Please Provide all Required Fields");
        }

        try {
            const result = await dispatch(userRegister(formData));

            if (userRegister.fulfilled.match(result)) {
                toast.success("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                toast.error(result.payload || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return { handleLogin, handleRegister };
};

export default useAuthService;
