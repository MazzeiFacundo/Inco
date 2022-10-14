import "./LandingPage.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../features/products/productsSlice";
import { validate } from "../../Validations/validateLogin";
import logo from "../NavBar/Inco.png"
import banner from "../maplogotext.png"
import houseSlide3 from "../house1.jpg"


function LandingPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        if (userToken) {
            navigate("/home");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            const response = await axios.post("http://localhost:3001/login", input);
            console.log(response)
            dispatch(getToken(response.data.token));
            window.localStorage.setItem(
                "userCredentials",
                JSON.stringify(response.data.token)
            );
            navigate("/home");
            setInput({ email: "", password: "" });
        } catch (e) {
            if (e.response.data.msgE === "Incorrect Password") setErrors({ password: e.response.data.msgE })
            if (e.response.data.msgE === "This email adress has not been registered yet") setErrors({ email: e.response.data.msgE })
            console.log(e.response.data.msgE)
            setInput({
                email: "",
                password: "",
            });
        }
    };

    const handleSubmitGuest = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            const response = await axios.post("http://localhost:3001/login",
                {
                    email: "IncoGuestEmail@gmail.com",
                    password: "GuestPassword1"
                });
            console.log(response)
            dispatch(getToken(response.data.token));
            window.localStorage.setItem(
                "userCredentials",
                JSON.stringify(response.data.token)
            );
            navigate("/home");
            setInput({ email: "", password: "" });
        } catch (e) {
            if (e.response.data.msgE === "Incorrect Password") setErrors({ password: e.response.data.msgE })
            if (e.response.data.msgE === "This email adress has not been registered yet") setErrors({ email: e.response.data.msgE })
            console.log(e.response.data.msgE)
            setInput({
                email: "",
                password: "",
            });
        }
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    };

    return (
        <div className="landingPageContainer">
            <div className="formContainer">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="formLogin">

                    <div className="welcomeLanding">
                        <img className="logoLanding" src={logo} />
                    </div>

                    <div className="textFormLogin">E-mail</div>
                    <input
                        autocomplete="off"
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={(e) => handleChange(e)}
                        className="inputLogin"
                    ></input>
                    {errors.email && (
                        <div className="showErrorEmail">{errors.email}</div>
                    )}


                    <div className="textFormLogin">Password</div>
                    <input
                        className="inputLogin"
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={(e) => handleChange(e)}
                    ></input>

                    {errors.password && (
                        <div className="showErrorEmail">{errors.password}</div>
                    )}

                    <button type="submit" className={errors.email || input.password.length < 3 ? "buttonLoginDisabled" : "buttonLogin"}>Log In</button>
                    <button onClick={(e) => handleSubmitGuest(e)} type="submit" className="buttonLogin">Log in as a guest</button>
                    <div className="orDiv"><div className="textOr">Or</div></div>
                    <a className="registerLogin" href="/register">Don't have an account? Register!</a>
                </form>
            </div>
                <img className="imgLanding" src={houseSlide3}></img>
        </div>
    )
}

export default LandingPage;