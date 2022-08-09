import "./LandingPage.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../features/products/productsSlice";
import { validate } from "../../Validations/validateLogin";


function LandingPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
        userName: "",
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
            if (response.data.msgE) {
                setInput({
                    email: "",
                    password: "",
                    userName: "",
                });
                return;
            }
            dispatch(getToken(response.data.token));
            window.localStorage.setItem(
                "userCredentials",
                JSON.stringify(response.data.token)
            );
            navigate("/home");
            setInput({ email: "", password: "", userName: "" });
        } catch (e) {
            console.log("nope")
            setInput({
                email: "",
                password: "",
                userName: "",
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
            <img className="imgLanding" src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/FJYA5LJ4PNEIVNBUDMQ66KV6UQ.jpg"></img>
            <div className="rightLanding">
                <div className="welcomeLanding">Welcome to Inco Real State</div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="formLogin">

                    <div className="textFormLogin">User Name</div>
                    <input
                        type="text"
                        name="userName"
                        value={input.userName}
                        onChange={(e) => handleChange(e)}
                        className="inputLogin"
                    ></input>

                    {errors.userName ? (
                        <div className="showErrorEmail">{errors.email}</div>
                    ) : (
                        <div className="hideErrorEmail">a</div>
                    )}


                    <div className="textFormLogin">E-mail</div>
                    <input
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={(e) => handleChange(e)}
                        className="inputLogin"
                    ></input>
                    {errors.email ? (
                        <div className="showErrorEmail">{errors.email}</div>
                    ) : (
                        <div className="hideErrorEmail">a</div>
                    )}


                    <div className="textFormLogin">Password</div>
                    <input
                        className="inputLogin"
                        type="text"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                    ></input>

                    <button type="submit" className="buttonLogin">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LandingPage;