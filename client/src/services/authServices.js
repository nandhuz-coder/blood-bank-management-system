import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password)
            return toast.error("Please Provide all Fields");
        store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error);
    }
};

const handleRegister = (e,
    name,
    role,
    email,
    password,
    organisationName,
    hospitalName,
    address,
    website,
    phone) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({
            name,
            role,
            email,
            password,
            organisationName,
            hospitalName,
            address,
            website,
            phone
        })
        );
    } catch (error) {
        console.log(error);
    }
};

export { handleLogin, handleRegister };