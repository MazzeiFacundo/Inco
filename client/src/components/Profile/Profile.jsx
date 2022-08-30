import "./Profile.css"
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CardProfile from "../CardProfile/CardProfile";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { showUserData, getCurrentUser } from "../../features/products/productsSlice"
import FiltersProfile from "../FiltersProfile/FiltersProfile";


function Profile() {

    const dispatch = useDispatch();
    const currentUser = useSelector(showUserData)

    const [openModal, setOpenModal] = useState(false)
    const [photoUser, setPhotoUser] = useState({});

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        const newUser = dispatch(getCurrentUser(userToken))
    }, []);

    const userProducts = currentUser.products

    const handleOpenModal = () => {
        setOpenModal(true)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        const fdUserImage = new FormData();
        fdUserImage.append("photoUser", e.target.files[0], "photoUser")

        try {
            const responseProductImg = await axios.post(`http://localhost:3001/users/editProfilePhoto?id=${currentUser.idUser}`,
                fdUserImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(responseProductImg)

            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profileContainer">
            <NavBar></NavBar>
            <div className="userData">
                {/* <div className="goBackProfileContainer">
                    <FontAwesomeIcon className="iconGoBackProfile" icon={faCircleChevronLeft}/>
                    <a className="goBackProfile" href="/home">Go back</a>
                </div> */}
                <div className="redBorder">
                    <div className="userHeadline">
                        <button onClick={() => handleOpenModal()}>Edit you profile</button>
                        {openModal &&
                            <div className="ep-modal-in-pf">
                                <EditProfileModal
                                    fullName={currentUser.fullName}
                                    tel={currentUser.telephone}
                                    description={currentUser.description}
                                    closeModal={setOpenModal}
                                >
                                </EditProfileModal>
                            </div>
                        }
                        <img className="imgUser" src={`http://localhost:3001/users/getPhotoUser?userName=${currentUser.userName}`} alt="none" />
                        <input
                            type="file"
                            name="photoProfile"
                            onChange={(e) => handleSubmit(e)}
                        />
                        <div className="userHeadLineText">
                            <div className="userNameProfile">{currentUser.fullName}</div>
                            <div className="amountOfProducts">{currentUser.email}</div>
                            <div>tel: {currentUser.telephone}</div>
                        </div>
                    </div>
                </div>
                <div className="descriptionProfile">
                    <div className="descriptionProfileText">{currentUser.description}</div>
                </div>
                {console.log(currentUser)}

            </div>

            {console.log(currentUser.products)}
            <div className="userProducts">
                {
                    (userProducts || []).map((e) => {
                        return <a className="linkProfileP" href={"/Home/" + e.id}>
                            <CardProfile
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                description={e.description}
                                price={e.price}
                                productWidth={e.productWidth}
                                productHeight={e.productHeight}
                                rooms={e.rooms}
                                dorms={e.dorms}
                                bathrooms={e.bathrooms}
                                typeOfProduct={e.typeOfProduct}
                            ></CardProfile>
                        </a>
                    })
                }
            </div>
            {/* <FiltersProfile></FiltersProfile> */}
        </div>
    )
}

export default Profile;