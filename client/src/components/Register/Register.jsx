import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../features/products/productsSlice";
import { validateRegister } from "../../Validations/validateRegister";
import "./Register.css"
import logo from "../NavBar/Inco.png"
import axios from "axios";

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
        tel: ""
    })

    function handleChange(e) {
        console.log(e.target.name)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateRegister({ ...input, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        setErrors(validateRegister({ ...input, [e.target.name]: e.target.value }))
        if (input.password !== input.repeatPassword) return setErrors({ ...errors, repeatPassword: "Passwords do not match" })
        try {
            const response = await axios.post("http://localhost:3001/register", input);
            console.log(response)
            if (response.data.msgE) {
                setInput({
                    fullName: "",
                    userName: "",
                    email: "",
                    password: "",
                    repeatPassword: "",
                    tel: ""
                });
                return;
            }
            dispatch(getToken(response.data.token));
            window.localStorage.setItem(
                "userCredentials",
                JSON.stringify(response.data.token)
            );
            navigate("/home");
            setInput({
                fullName: "",
                userName: "",
                email: "",
                password: "",
                repeatPassword: "",
                tel: ""
            });
        } catch (e) {
            if (e.response.data.msgE === "This username is already registered") setErrors({ userName: e.response.data.msgE })
            if (e.response.data.msgE === "This email is already registered") setErrors({ email: e.response.data.msgE })
            setInput({
                fullName: "",
                userName: "",
                email: "",
                password: "",
                repeatPassword: "",
                tel: ""
            });
        }
    }

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        if (userToken) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="registerContainer">

            <form className="formContainerRegister" onSubmit={(e) => handleSubmit(e)}
            >
                <a className="goBackRegisterContainer" href="/">
                    <button 
                    className="goBackRegister"
                    type="button"
                    >Go back</button>
                </a>
                <div className="logoLandingRegisterDiv">
                    <img className="logoLandingRegister" src={logo} />
                    <div className="registerText">Welcome to Inco! Creating an account is free!</div>
                </div>


                <div className="inputsContainer">
                    <div className="inputDivLeft">
                        <div className="inputDiv">
                            <label className="inputText">Name:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.fullName}
                                name="fullName"
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                                <div className="errorLogin">{errors.fullName}</div>
                            )}
                        </div>
                        <div className="inputDiv">
                            <label className="inputText">User Name:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.userName}
                                name="userName"
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter your user name"
                            />
                            {errors.userName && (
                                <div className="errorLogin">{errors.userName}</div>
                            )}
                        </div>
                        <div className="inputDiv">
                            <label className="inputText">Password:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.password}
                                name="password"
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <div className="errorLogin">{errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className="inputDivRight">
                        <div className="inputDiv">
                            <label className="inputText">Telphone:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.tel}
                                name="tel"
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter your Telphone"
                            />
                            {errors.tel && (
                                <div className="errorLogin">{errors.tel}</div>
                            )}
                        </div>
                        <div className="inputDiv">
                            <label className="inputText">Email:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.email}
                                name="email"
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <div className="errorLogin">{errors.email}</div>
                            )}
                        </div>
                        <div className="inputDiv">
                            <label className="inputText">Repeat password:</label>
                            <input
                                autocomplete="off"
                                className="singleInput"
                                type="text"
                                value={input.repeatPassword}
                                name="repeatPassword"
                                onChange={(e) => handleChange(e)}
                                placeholder="Repeat your password"
                            />
                            {input.repeatPassword !== input.password && (
                                <div className="errorLogin">Passwords must match</div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        errors.fullName ||
                            errors.userName ||
                            errors.email ||
                            errors.tel ||
                            errors.password ||
                            input.repeatPassword !== input.password ||
                            input.fullName.length < 3
                            ? <button type="submit" className="buttonRegisterDisabled">Register</button>
                            : <button type="submit" className="buttonRegister">Register</button>
                    }
                </div>


            </form>
        </div>
    )
}

export default Register;