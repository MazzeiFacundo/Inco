import React, { useState, useEffect, componentWillUnmount } from "react";
import { useNavigate } from "react-router-dom";
import { validateProfileEdit } from "../../Validations/validateProfileEdit";
import axios from "axios";
import "./EditProfileModal.css"


function EditProfileModal({ fullName, tel, description, closeModal }) {

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        token: "",
        fullName: fullName,
        tel: tel,
        description: description
    })

    const navigate = useNavigate();

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        setInput({
            ...input,
            token: userToken
        })
        console.log(userToken)
        if (!userToken) {
            navigate("/");
        }
    }, []);

    function handleChange(e) {
        console.log(e.target.name)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateProfileEdit({ ...input, [e.target.name]: e.target.value }))
    }

    const handleCloseModal = () => {
        closeModal(false)
        document.body.style.overflow = 'unset';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            console.log(input)
            const response = await axios.post(`http://localhost:3001/users/editProfileInfo`, input);
            console.log(response)
            window.location.reload();
            setInput({
                token: "",
                fullName: fullName,
                tel: tel,
                description: description
            });
        } catch (e) {
            console.log(e.response.data.msgE)
            setInput({
                token: "",
                fullName: fullName,
                tel: tel,
                description: description
            });
        }
    };

    return (
        <div className="ep-modal-container">
            <button className="ep-modal-close-modal-btn" onClick={() => handleCloseModal(false)}>X</button>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Full name:</label>
                    <input
                        type="text"
                        value={input.fullName}
                        name="fullName"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your Full name"
                    />
                    {errors.fullName && (
                        <div className="errorLogin">{errors.fullName}</div>
                    )}
                </div>
                <div>
                    <label>Contact number:</label>
                    <input
                        type="text"
                        value={input.tel}
                        name="tel"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your contact number"
                    />
                    {errors.tel && (
                        <div className="errorLogin">{errors.tel}</div>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your description"
                    />
                    {errors.description && (
                        <div className="errorLogin">{errors.description}</div>
                    )}
                </div>   
                {
                    errors.fullName || errors.tel || errors.description
                        ? <button type="submit" className="ep-modal-submit-btn-disabled">Edit profile information</button>
                        : <button type="submit" className="ep-modal-submit-btn">Edit profile information</button>
                }
            </form>
        </div>
    )
}

export default EditProfileModal;