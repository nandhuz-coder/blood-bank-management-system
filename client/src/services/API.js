import axios from "axios"; 


//Interceptor Created
const API=axios.create({baseURL:process.env.REACT_APP_BASEURL});

API.interceptors.request.use((req)=>{
    //Whenever user will login then will generate token and save it to local storage
    if(localStorage.getItem("token")){
        req.headers.Authorization=`Bearer ${localStorage.getItem("token")}`;
    }
    return req;
});
export default API;