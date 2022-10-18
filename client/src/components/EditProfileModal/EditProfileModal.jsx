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
            <button
                className="ep-close-modal-btn"
                onClick={() => handleCloseModal(false)}
            >X</button>
            <form
                className="ep-modal-form"
                onSubmit={(e) => handleSubmit(e)}>
                <div className="ep-modal-single-input-container">
                    <label className="ep-modal-single-input-label">Full name:</label>
                    <input
                        autoComplete="off"
                        className="ep-modal-single-input"
                        type="text"
                        value={input.fullName}
                        name="fullName"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your Full name"
                    />
                    {errors.fullName && (
                        <div className="ep-modal-error">{errors.fullName}</div>
                    )}
                </div>
                <div className="ep-modal-single-input-container">
                    <label className="ep-modal-single-input-label">Contact number:</label>
                    <input
                        autoComplete="off"
                        className="ep-modal-single-input"
                        type="text"
                        value={input.tel}
                        name="tel"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your contact number"
                    />
                    {errors.tel && (
                        <div className="ep-modal-error">{errors.tel}</div>
                    )}
                </div>
                <div className="ep-modal-single-input-container-description">
                    <label className="ep-modal-single-input-label">Description:</label>
                    <textarea
                        autoComplete="off"
                        className="ep-modal-single-input-description"
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your description"
                    />
                    {errors.description && (
                        <div className="ep-modal-error-desc">{errors.description}</div>
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