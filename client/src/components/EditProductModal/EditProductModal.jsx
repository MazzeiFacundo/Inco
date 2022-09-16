import React, { useState, useEffect, componentWillUnmount } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail, showUserData, getCurrentUser, getCurrentProductDetail } from "../../features/products/productsSlice"
import axios from "axios";
import EditImgGallery from "../EditImgGallery/EditImgGallery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faExchangeAlt, faDoorOpen, faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import "./EditProductModal.css"


function EditProductModal({
    userId,
    pId,
    pName,
    pDescription,
    pPrice,
    pLocation,
    pRooms,
    pDorms,
    pBathrooms,
    pWidth,
    pHeight,
    pTypeOfProduct,
    pTypeOfDeal,
    closeModal
}) {

    const dispatch = useDispatch();
    const currentProduct = useSelector(productDetail)
    const currentUser = useSelector(showUserData)

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        const currentUser = dispatch(getCurrentUser(userToken))
        const currentProduct = dispatch(getCurrentProductDetail(pId))
    }, []);

    const [slideNumber, setSlideNumber] = useState(0)
    const [errors, setErrors] = useState({});
    const [secondTypeOfDeal, setSecondTypeOfDeal] = useState(false)
    const [imgList, setImgList] = useState([{ image: "" }])
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: "",
        location: "",
        productWidth: "",
        productHeight: "",
        rooms: "",
        dorms: "",
        bathrooms: "",
        typeOfProduct: "",
        typeOfDeal: "",
        secondTypeOfDeal: ""
    })

    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber - 1)

    }

    const nextSlide = () => {
        slideNumber === 1
            ? setSlideNumber(1)
            : setSlideNumber(slideNumber + 1)
    }

    function handleChange(e) {
        console.log(e.target.name)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
        console.log(input)
    }

    function handleSelectType(e) {
        setInput({
            ...input,
            typeOfProduct: e.target.value
        })
    }

    function handleSelectTypeOfDeal(e) {
        if (e.target.value === input.secondTypeOfDeal) {
            return setInput({
                ...input,
                typeOfDeal: ""
            })
        }
        setInput({
            ...input,
            typeOfDeal: e.target.value
        })
    }

    const handleSecondTypeOfDeal = (e) => {
        e.preventDefault()
        setSecondTypeOfDeal(true)
    };

    const handleCloseSecondTypeOfDeal = (e) => {
        e.preventDefault()
        setSecondTypeOfDeal(false)
    };

    function handleSelectSecondTypeOfDeal(e) {
        if (e.target.value === input.typeOfDeal) {
            return setInput({
                ...input,
                secondTypeOfDeal: ""
            })
        }
        setInput({
            ...input,
            secondTypeOfDeal: e.target.value
        })
    }

    const handleAddImg = () => {
        setImgList([...imgList, { image: "" }])
        console.log(imgList)
    }

    const handleRemoveImg = (index) => {
        const newList = [...imgList]
        newList.splice(index, 1);
        setImgList(newList)
    }

    const handleImgChange = (e, index) => {
        const { name, files } = e.target
        const newList = [...imgList]
        newList[index][name] = files[0];
        setImgList(newList)
        console.log(e.target.files[0])
    }

    const handleCloseModal = () => {
        closeModal(false)
        document.body.style.overflow = 'unset';
    }

    const handleSubmitProductImg = async (e) => {
        console.log(e.target.files[0]);
        const fdGalleryImage = new FormData();
        fdGalleryImage.append("photoProduct", e.target.files[0], "photoProduct")

        try {
            const responseProductImg = await axios.post(`http://localhost:3001/listNew/productImage?id=${pId}`,
                fdGalleryImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(responseProductImg)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        // setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))

        const fd = new FormData();
        fd.append("id", pId);
        fd.append("name", input.name);
        fd.append("description", input.description);
        fd.append("price", input.price);
        fd.append("location", input.location)
        fd.append("productWidth", input.productWidth);
        fd.append("productHeight", input.productHeight);
        fd.append("rooms", input.rooms);
        fd.append("dorms", input.dorms);
        fd.append("bathrooms", input.bathrooms);
        fd.append("typeOfProduct", input.typeOfProduct);
        fd.append("typeOfDeal", input.typeOfDeal);
        fd.append("secondTypeOfDeal", input.secondTypeOfDeal);

        try {
            const responseInput = await axios.post("http://localhost:3001/listNew/productEdition", fd);
            if (responseInput.data.msgE) {
                setInput({
                    name: "",
                    description: "",
                    price: "",
                    location: "",
                    productWidth: "",
                    productHeight: "",
                    rooms: "",
                    dorms: "",
                    bathrooms: "",
                    typeOfProduct: "",
                    typeOfDeal: "",
                    secondTypeOfDeal: ""
                });
                return;
            }

            const singleImgResponse = async () => {
                const images = await Promise.all(imgList.map(img => {
                    let fdProductGallery = new FormData();
                    fdProductGallery.append("photoGallery", img.image, "photoGallery")
                    return axios.post(`http://localhost:3001/listNew/galleryImage?id=${responseInput.data.productUpdatedSend.id}`,
                        fdProductGallery, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }))
                return images
            }
            singleImgResponse()

            setInput({
                name: "",
                description: "",
                price: "",
                location: "",
                productWidth: "",
                productHeight: "",
                rooms: "",
                dorms: "",
                bathrooms: "",
                typeOfProduct: "",
                typeOfDeal: "",
                secondTypeOfDeal: ""
            });
        } catch (e) {
            console.log(e)
            setInput({
                name: "",
                description: "",
                price: "",
                location: "",
                productWidth: "",
                productHeight: "",
                rooms: "",
                dorms: "",
                bathrooms: "",
                typeOfProduct: "",
                typeOfDeal: "",
                secondTypeOfDeal: ""
            });
        }
    }

    return (
        <div className="e-product-modal-container">
            <button className="ep-modal-close-modal-btn" onClick={() => handleCloseModal(false)}>X</button>
            <form onSubmit={(e) => handleSubmit(e)}>
                {
                    (currentProduct || []).map((e) => {
                        return (
                            <div className="e-product-modal-form-container">
                                {
                                    slideNumber === 1 && (
                                        <div className="e-product-modal-p-img-container">
                                            <div className="e-product-modal-img-gallery-container">
                                                <div className="e-product-modal-img-container">
                                                    <img className="e-product-modal-img" src={`http://localhost:3001/display/getPhotoProduct?id=${e.id}`} alt="none" />
                                                </div>
                                                <EditImgGallery className="detail-p-gallery-imgs-container" id={e.id}></EditImgGallery>
                                            </div>

                                            <input
                                                type="file"
                                                name="photoProfile"
                                                onChange={(e) => handleSubmitProductImg(e)}
                                            />
                                            <div className="list-p-btn-prev-container">
                                                <button onClick={prevSlide} className="list-p-btn-prev">Prev</button>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    slideNumber === 0 && (
                                        <div className="e-product-modal-slide-zero-container">
                                            <div className="e-product-modal-form-fields-container">
                                                <div className="e-product-modal-text-inputs-container">
                                                    <label className="e-product-modal-single-label">Product name</label>
                                                    <input
                                                        type="text"
                                                        value={input.name}
                                                        name="name"
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder="Your product name"
                                                        className="e-product-modal-single-input"
                                                    />

                                                    <label className="e-product-modal-single-label">Description</label>
                                                    <textarea type="text"
                                                        value={input.description}
                                                        name="description"
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder="Your product description"
                                                        className="e-product-modal-single-desc-input"
                                                    >
                                                    </textarea>

                                                    <label className="e-product-modal-single-label">Price</label>
                                                    <input
                                                        value={input.price}
                                                        name="price"
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder="Your product price"
                                                        className="e-product-modal-single-input"
                                                    >
                                                    </input>

                                                    <label className="e-product-modal-single-label">Location</label>
                                                    <input
                                                        value={input.location}
                                                        name="location"
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder="Your product location"
                                                        className="e-product-modal-single-input"
                                                    >
                                                    </input>
                                                </div>

                                                <div className="e-product-modal-value-inputs-container">
                                                    <label className="e-product-modal-main-labels">Accomodations</label>
                                                    <div className="e-product-modal-accomodations-container">

                                                        <div className="e-product-modal-acc-input-general-container">
                                                            <label>Rooms</label>
                                                            <div className="e-product-modal-acc-input-container">
                                                                <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faDoorOpen}></FontAwesomeIcon>
                                                                <input
                                                                    value={input.rooms}
                                                                    name="rooms"
                                                                    onChange={(e) => handleChange(e)}
                                                                    placeholder="0"
                                                                    className="e-product-modal-single-acc-input"
                                                                >
                                                                </input>
                                                            </div>
                                                        </div>

                                                        <div className="e-product-modal-acc-input-general-container">
                                                            <label>Dorms</label>
                                                            <div className="e-product-modal-acc-input-container">
                                                                <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faBed}></FontAwesomeIcon>
                                                                <input
                                                                    value={input.dorms}
                                                                    name="dorms"
                                                                    onChange={(e) => handleChange(e)}
                                                                    placeholder="0"
                                                                    className="e-product-modal-single-acc-input"
                                                                >
                                                                </input>
                                                            </div>
                                                        </div>

                                                        <div className="e-product-modal-acc-input-general-container">
                                                            <label>Bathrooms</label>
                                                            <div className="e-product-modal-acc-input-container">
                                                                <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faBath}></FontAwesomeIcon>
                                                                <input
                                                                    value={input.bathrooms}
                                                                    name="bathrooms"
                                                                    onChange={(e) => handleChange(e)}
                                                                    placeholder="0"
                                                                    className="e-product-modal-single-acc-input"
                                                                >
                                                                </input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="e-product-modal-main-labels">Measurements</label>
                                                    <div className="e-product-modal-measurements-container">
                                                        <div className="e-product-modal-acc-input-general-container">
                                                            <label>Width</label>
                                                            <div className="e-product-modal-acc-input-container">
                                                                <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faExchangeAlt}></FontAwesomeIcon>
                                                                <input
                                                                    value={input.productWidth}
                                                                    name="productWidth"
                                                                    onChange={(e) => handleChange(e)}
                                                                    placeholder="0"
                                                                    className="e-product-modal-single-acc-input"
                                                                >
                                                                </input>
                                                            </div>
                                                        </div>

                                                        <div className="e-product-modal-acc-input-general-container">
                                                            <label>Height</label>
                                                            <div className="e-product-modal-acc-input-container">
                                                                <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faLongArrowAltUp}></FontAwesomeIcon>
                                                                <input
                                                                    value={input.productHeight}
                                                                    name="productHeight"
                                                                    onChange={(e) => handleChange(e)}
                                                                    placeholder="0"
                                                                    className="e-product-modal-single-acc-input"
                                                                >
                                                                </input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="e-product-modal-selects-container">
                                                        <div className="e-product-modal-single-select-container">
                                                            <label>Type of product</label>
                                                            <select className="e-product-modal-single-select" onChange={(e) => handleSelectType(e)}>
                                                                <option value="House">House</option>
                                                                <option value="Apartment">Apartment</option>
                                                                <option value="Land">Land</option>
                                                                <option value="Duplex">Duplex</option>
                                                            </select>
                                                        </div>

                                                        <div className="e-product-modal-single-select-container">
                                                            <label>Type of deal</label>
                                                            <select className="e-product-modal-single-select" onChange={(e) => handleSelectTypeOfDeal(e)}>
                                                                <option value="Sale">Sale</option>
                                                                <option value="Rent">Rent</option>
                                                                <option value="Touristic rent">Touristic rent</option>
                                                            </select>
                                                            {
                                                                !secondTypeOfDeal && (
                                                                    <button onClick={(e) => handleSecondTypeOfDeal(e)}>Add a second deal</button>
                                                                )
                                                            }
                                                            {
                                                                secondTypeOfDeal && (
                                                                    <div className="e-product-modal-single-select-container">
                                                                        <select className="e-product-modal-single-select" onChange={(e) => handleSelectSecondTypeOfDeal(e)}>
                                                                            <option value="Sale">Sale</option>
                                                                            <option value="Rent">Rent</option>
                                                                            <option value="Touristic rent">Touristic rent</option>
                                                                        </select>
                                                                        <button className="e-product-modal-remove-deal-btn" onClick={(e) => handleCloseSecondTypeOfDeal(e)}>Remove second deal</button>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            {/* <div className="e-product-modal-add-imgs-container">
                                                {imgList.map((img, index) => {
                                                    console.log(imgList)
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <input
                                                                    name="image"
                                                                    type="file"
                                                                    id="image"
                                                                    required
                                                                    onChange={(e) => handleImgChange(e, index)}
                                                                />
                                                                {
                                                                    imgList.length - 1 === index && imgList.length < 10 &&
                                                                    <button onClick={handleAddImg} type="button">
                                                                        <span>Add an image</span>
                                                                    </button>
                                                                }
                                                            </div>

                                                            <div>
                                                                {
                                                                    imgList.length > 1 &&
                                                                    <button onClick={(() => handleRemoveImg(index))} type="button">
                                                                        <span>Remove</span>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div> */}
                                            <div className="e-product-btn-next-container">
                                                <button onClick={nextSlide} className="e-product-btn-next">Next</button>
                                            </div>
                                            <button type="submit" className="e-product-modal-submit-btn">Edit profile information</button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </form>
            {console.log(currentProduct)}
        </div>
    )
}

export default EditProductModal;