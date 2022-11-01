import React, { useState, useEffect, componentWillUnmount } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail, showUserData, getCurrentUser, getCurrentProductDetail, getProductsGallery } from "../../features/products/productsSlice"
import { validateEditProduct } from "../../Validations/validateEditProduct";
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
    galleryLenght,
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
        console.log(galleryLenght.flat(1).length)
    }, []);

    const [errors, setErrors] = useState({});
    const [slideNumber, setSlideNumber] = useState(0)
    const [galleryCount, setGalleryCount] = useState(0);
    const [submitGalleryE, setSubmitGalleryE] = useState(true)
    const [secondTypeOfDeal, setSecondTypeOfDeal] = useState(false)
    const [imgList, setImgList] = useState([{ image: "" }])
    const [input, setInput] = useState({
        name: pName,
        description: pDescription,
        price: pPrice,
        location: pLocation,
        productWidth: pWidth,
        productHeight: pHeight,
        rooms: pRooms,
        dorms: pDorms,
        bathrooms: pBathrooms,
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
        setErrors(validateEditProduct({ ...input, [e.target.name]: e.target.value }));
        console.log(input)
    }

    function handleSelectType(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateEditProduct({ ...input, [e.target.name]: e.target.value }));
    }

    function handleSelectTypeOfDeal(e) {
        if (e.target.value === input.secondTypeOfDeal) {
            setErrors({ typeOfDeal: "You cannot list identical deals" })
            setInput({
                ...input,
                [e.target.name]: ""
            })
            return setInput({
                ...input,
                secondTypeOfDeal: ""
            })
        }
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateEditProduct({ ...input, [e.target.name]: e.target.value }))
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
            setErrors({ secondTypeOfDeal: "You cannot list identical deals" })
            setInput({
                ...input,
                [e.target.name]: ""
            })
            return setInput({
                ...input,
                typeOfDeal: ""
            })
        }
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateEditProduct({ ...input, [e.target.name]: e.target.value }))
    }

    const handleAddImg = () => {
        setImgList([...imgList, { image: "" }])
        console.log(imgList)
        setSubmitGalleryE(true)
        // setTimeout(() => {
        //     if (imgList.filter((e) => { return typeof e.image === "string" }).length >= 1) {
        //         console.log("here")
        //         setSubmitGalleryE(true)
        //     } else if (!submitGalleryE) setSubmitGalleryE(false)
        // }, 100);
        console.log(imgList.filter((e) => { return typeof e.image === "string" }).length + 1)
    }

    const handleRemoveImg = (index) => {
        const newList = [...imgList]
        newList.splice(index, 1);
        setTimeout(() => {
            setImgList(newList)
        }, 100);
        const galleryCounter = imgList.filter((e) => { return typeof e.image.name === "string" }).length
        setTimeout(() => {
            if (imgList.filter((e) => { return typeof e.image === "string" }).length < 1) {
                console.log("turned False")
                if (submitGalleryE) setSubmitGalleryE(false)
                setTimeout(() => {
                    if (imgList.filter((e) => { return typeof e.image.name === "string" }).length + galleryCounter <= 9) {
                        console.log("turned False")
                        if (submitGalleryE) setSubmitGalleryE(false)
                    } else if (!submitGalleryE) setSubmitGalleryE(true)
                }, 200);
            } else setSubmitGalleryE(true)
        }, 200);

        console.log(galleryLenght.flat(1).length)
        console.log(imgList.filter((e) => { return typeof e.image.name === "string" }).length)
    }

    const handleImgChange = (e, index) => {
        const { name, files } = e.target
        const newList = [...imgList]
        newList[index][name] = files[0];
        setImgList(newList)
        setTimeout(() => {
            if (imgList.filter((e) => { return typeof e.image === "string" }).length < 1) {
                console.log("turned False")
                if (submitGalleryE) setSubmitGalleryE(false)
                setTimeout(() => {
                    if (imgList.filter((e) => { return typeof e.image.name === "string" }).length + galleryLenght.flat(1).length <= 9) {
                        console.log("turned False")
                        if (submitGalleryE) setSubmitGalleryE(false)
                    } else setSubmitGalleryE(true)
                }, 20);
            } else setSubmitGalleryE(true)
        }, 10);

        console.log(imgList.filter((e) => { return typeof e.image.name === "string" }).length)
        console.log(galleryLenght.flat(1).length)
    }

    const handleCloseModal = () => {
        closeModal(false)
        document.body.style.overflow = 'unset';
    }

    const handleSubmitProductImg = async (e) => {
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
        window.location.reload()
    }

    const handleSubmitProductGallery = async (e) => {
        e.preventDefault(e)
        try {
            const images = await Promise.all(imgList.map(img => {
                let fdProductGallery = new FormData();
                fdProductGallery.append("photoGallery", img.image, "photoGallery")
                return axios.post(`http://localhost:3001/listNew/galleryImage?id=${pId}`,
                    fdProductGallery, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }))
            dispatch(getProductsGallery(pId))
            setImgList([{ image: "" }])
            console.log(galleryLenght.flat(1).length)
            window.location.reload()
            return images
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        // setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))

        const fd = new FormData();
        fd.append("id", pId);
        if (input.name !== pName) fd.append("name", input.name);
        if (input.description !== pDescription) fd.append("description", input.description);
        if (input.price !== pPrice) fd.append("price", input.price);
        if (input.location !== pLocation) fd.append("location", input.location)
        if (input.productWidth !== pWidth) fd.append("productWidth", input.productWidth);
        if (input.productHeight !== pHeight) fd.append("productHeight", input.productHeight);
        if (input.rooms !== pRooms) fd.append("rooms", input.rooms);
        if (input.dorms !== pDorms) fd.append("dorms", input.dorms);
        if (input.bathrooms !== pBathrooms) fd.append("bathrooms", input.bathrooms);
        if (input.typeOfProduct !== pTypeOfProduct) fd.append("typeOfProduct", input.typeOfProduct);
        if (input.typeOfDeal !== pTypeOfDeal) fd.append("typeOfDeal", input.typeOfDeal);
        if (input.secondTypeOfDeal !== "") fd.append("secondTypeOfDeal", input.secondTypeOfDeal);


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
        window.location.reload();
    }

    return (
        <div className="e-product-modal-container">
            {
                (currentProduct || []).map((e) => {
                    return (
                        <div className="e-product-modal-form-container">
                            {
                                slideNumber === 0 && (
                                    <form className="e-product-modal-slide-zero-container" onSubmit={(e) => handleSubmit(e)}>
                                        <button className="ep-modal-close-modal-btn-mobile" onClick={() => handleCloseModal(false)}>X</button>
                                        <div className="e-product-modal-text-inputs-container">
                                            <div className="e-product-modal-single-input-container">
                                                <label className="e-product-modal-single-label">Product name</label>
                                                <input
                                                    autocomplete="off"
                                                    type="text"
                                                    value={input.name}
                                                    name="name"
                                                    onChange={(e) => handleChange(e)}
                                                    placeholder={pName}
                                                    className="e-product-modal-single-input"
                                                />
                                                {errors.name && (
                                                    <div className="e-product-modal-error">{errors.name}</div>
                                                )}
                                            </div>

                                            <div className="e-product-modal-single-input-container">
                                                <label className="e-product-modal-single-label">Price</label>
                                                <span className="e-price-span">
                                                    <input
                                                        autocomplete="off"
                                                        value={input.price}
                                                        name="price"
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder={pPrice}
                                                        className="e-product-modal-single-input"
                                                    >
                                                    </input>
                                                </span>
                                                {errors.price && (
                                                    <div className="e-product-modal-error">{errors.price}</div>
                                                )}
                                            </div>

                                            <div className="e-product-modal-single-input-container">
                                                <label className="e-product-modal-single-label">Location</label>
                                                <input
                                                    autocomplete="off"
                                                    value={input.location}
                                                    name="location"
                                                    onChange={(e) => handleChange(e)}
                                                    placeholder={pLocation}
                                                    className="e-product-modal-single-input"
                                                >
                                                </input>
                                                {errors.location && (
                                                    <div className="e-product-modal-error">{errors.location}</div>
                                                )}
                                            </div>

                                            <div className="e-product-modal-single-input-container-desc">
                                                <label className="e-product-modal-single-label">Description</label>
                                                <textarea type="text"
                                                    value={input.description}
                                                    name="description"
                                                    onChange={(e) => handleChange(e)}
                                                    placeholder={pDescription}
                                                    className="e-product-modal-single-desc-input"
                                                >
                                                </textarea>
                                                {errors.description && (
                                                    <div className="e-product-modal-error-desc">{errors.description}</div>
                                                )}
                                            </div>

                                        </div>

                                        <div className="e-product-modal-value-inputs-container">
                                            <button className="ep-modal-close-modal-btn" onClick={() => handleCloseModal(false)}>X</button>

                                            <label className="e-product-modal-main-labels">Accomodations</label>
                                            <div className="e-product-modal-accomodations-container">
                                                <div className="e-product-modal-acc-input-general-container">
                                                    <label>Rooms</label>
                                                    <div className="e-product-modal-acc-input-container">
                                                        <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faDoorOpen}></FontAwesomeIcon>
                                                        <input
                                                            autocomplete="off"
                                                            value={input.rooms}
                                                            name="rooms"
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder={pRooms}
                                                            className="e-product-modal-single-acc-input"
                                                        >
                                                        </input>

                                                    </div>
                                                </div>

                                                <div className="e-product-modal-acc-input-general-container">
                                                    <label>Dormitories</label>
                                                    <div className="e-product-modal-acc-input-container">
                                                        <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faBed}></FontAwesomeIcon>
                                                        <input
                                                            autocomplete="off"
                                                            value={input.dorms}
                                                            name="dorms"
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder={pDorms}
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
                                                            autocomplete="off"
                                                            value={input.bathrooms}
                                                            name="bathrooms"
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder={pBathrooms}
                                                            className="e-product-modal-single-acc-input"
                                                        >
                                                        </input>

                                                    </div>
                                                </div>
                                                {errors.rooms && (
                                                    <div className="e-product-modal-error-numbers">{errors.rooms}</div>
                                                )}
                                                {errors.dorms && (
                                                    <div className="e-product-modal-error-numbers">{errors.dorms}</div>
                                                )}
                                                {errors.bathrooms && (
                                                    <div className="e-product-modal-error-numbers">{errors.bathrooms}</div>
                                                )}
                                            </div>
                                            <label className="e-product-modal-main-labels">Measurements</label>
                                            <div className="e-product-modal-measurements-container">
                                                <div className="e-product-modal-acc-input-general-container">
                                                    <label>Width</label>
                                                    <div className="e-product-modal-acc-input-container">
                                                        <FontAwesomeIcon className="e-product-modal-acc-input-icon" icon={faExchangeAlt}></FontAwesomeIcon>
                                                        <input
                                                            autocomplete="off"
                                                            value={input.productWidth}
                                                            name="productWidth"
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder={pWidth}
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
                                                            autocomplete="off"
                                                            value={input.productHeight}
                                                            name="productHeight"
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder={pHeight}
                                                            className="e-product-modal-single-acc-input"
                                                        >
                                                        </input>

                                                    </div>
                                                </div>
                                                {errors.productWidth && (
                                                    <div className="e-product-modal-error-numbers-measurements">{errors.productWidth}</div>
                                                )}
                                                {errors.productHeight && (
                                                    <div className="e-product-modal-error-numbers-measurements">{errors.productHeight}</div>
                                                )}
                                            </div>

                                            <div className="e-product-modal-selects-container">

                                                <div className="e-product-modal-single-select-container">
                                                    <label className="e-product-modal-single-select-label">Deal</label>
                                                    <select
                                                        className="e-product-modal-single-select"
                                                        onChange={(e) => handleSelectTypeOfDeal(e)}
                                                        value={input.typeOfDeal}
                                                        name="typeOfDeal"
                                                    >
                                                        <option value="" selected disabled hidden>Select a deal</option>
                                                        <option value="Sale">Sale</option>
                                                        <option value="Rent">Rent</option>
                                                        <option value="Touristic rent">Touristic rent</option>
                                                    </select>
                                                    {errors.typeOfDeal && (
                                                        <div className="e-product-modal-error-select">{errors.typeOfDeal}</div>
                                                    )}
                                                </div>
                                                {
                                                    !secondTypeOfDeal && (
                                                        <button className="e-product-modal-second-deal-btn" onClick={(e) => handleSecondTypeOfDeal(e)}>Add a second deal</button>
                                                    )
                                                }
                                                {
                                                    secondTypeOfDeal && (
                                                        <div className="e-product-modal-single-select-container">
                                                            <label className="e-product-modal-single-select-label">Second deal</label>
                                                            <select
                                                                className="e-product-modal-single-select"
                                                                onChange={(e) => handleSelectSecondTypeOfDeal(e)}
                                                                value={input.secondTypeOfDeal}
                                                                name="secondTypeOfDeal"
                                                            >
                                                                <option value="" selected disabled hidden>Select a deal</option>
                                                                <option value="Sale">Sale</option>
                                                                <option value="Rent">Rent</option>
                                                                <option value="Touristic rent">Touristic rent</option>
                                                            </select>
                                                            {errors.secondTypeOfDeal && (
                                                                <div className="e-product-modal-error-select-second-deal">{errors.secondTypeOfDeal}</div>
                                                            )}
                                                            <button className="e-product-modal-remove-deal-btn" onClick={(e) => handleCloseSecondTypeOfDeal(e)}>Remove second deal</button>
                                                        </div>
                                                    )
                                                }

                                                <div className="e-product-modal-single-select-container">
                                                    <label className="e-product-modal-single-select-label">Type of product</label>
                                                    <select
                                                        className="e-product-modal-single-select"
                                                        onChange={(e) => handleSelectType(e)}
                                                        value={input.typeOfProduct}
                                                        name="typeOfProduct"
                                                    >
                                                        <option value="" selected disabled hidden>Property</option>
                                                        <option value="House">House</option>
                                                        <option value="Apartment">Apartment</option>
                                                        <option value="Land">Land</option>
                                                        <option value="Duplex">Duplex</option>
                                                    </select>
                                                    {errors.typeOfProduct && (
                                                        <div className="e-product-modal-error-select">{errors.typeOfProduct}</div>
                                                    )}
                                                </div>


                                            </div>


                                        </div>
                                        <div className="e-product-modal-slide-zero-btns-container">
                                            <div className="e-product-btn-next-container">
                                                <button onClick={nextSlide} className="e-product-btn-next">Edit product image and gallery</button>
                                            </div>
                                            <div className="e-product-modal-slide-zero-or-div">
                                                <div className="e-product-modal-slide-zero-text-or">Or</div>
                                            </div>
                                            {
                                                errors.name ||
                                                    errors.price ||
                                                    errors.location ||
                                                    errors.description ||
                                                    errors.rooms ||
                                                    errors.dorms ||
                                                    errors.bathrooms ||
                                                    errors.productWidth ||
                                                    errors.productHeight ||
                                                    errors.typeOfProduct ||
                                                    errors.typeOfDeal ||
                                                    errors.secondTypeOfDeal ||
                                                    input.typeOfDeal.length < 1
                                                    ? <button type="button" className="e-product-modal-submit-btn-disabled">Edit product information</button>
                                                    : <button type="submit" className="e-product-modal-submit-btn">Edit product information</button>
                                            }
                                        </div>
                                    </form>
                                )
                            }


                            {
                                slideNumber === 1 && (
                                    <div className="e-product-modal-p-img-container">
                                        <form
                                            id="galleryForm"
                                            className="e-product-modal-add-imgs-form-container"
                                            onSubmit={(e) => handleSubmitProductGallery(e)}>
                                            <div className="e-product-modal-add-imgs-lists-container">
                                                <div className="e-product-modal-img-selected-list-container">
                                                    {
                                                        imgList.map((file) =>
                                                        (
                                                            <div
                                                                className="e-product-modal-img-selected-list-single"
                                                                key={file.name}>
                                                                {
                                                                    file.image.name &&
                                                                        file.image.name.length >= 10
                                                                        ? file.image.name.substring(0, file.image.name.indexOf(".")).substring(0, 10) + "." + file.image.name.split('.').pop()
                                                                        : file.image.name
                                                                }
                                                            </div>

                                                        ))
                                                    }
                                                </div>
                                                <div className="e-product-modal-add-imgs-container">
                                                    {
                                                        imgList.map((img, index) => {
                                                            return (
                                                                <div className="e-product-modal-add-img-single-container" key={index}>
                                                                    <div className="e-product-modal-add-img-single-btns-container">
                                                                        <label className="e-product-modal-add-img-single-input-label">
                                                                            Upload
                                                                            <input
                                                                                name="image"
                                                                                type="file"
                                                                                id="image"
                                                                                className="e-product-modal-add-img-single-input"
                                                                                required
                                                                                onChange={(e) => {
                                                                                    handleImgChange(e, index)
                                                                                    setSubmitGalleryE(false)
                                                                                }
                                                                                }
                                                                            />
                                                                        </label>

                                                                        {
                                                                            imgList.length > 1 &&
                                                                            <button className="e-product-modal-add-img-single-remove-btn" onClick={(() => handleRemoveImg(index))} type="button">
                                                                                <span>X</span>
                                                                            </button>
                                                                        }
                                                                    </div>

                                                                    {
                                                                        imgList.length - 1 === index && imgList.length < 9 &&
                                                                        <div className="e-product-modal-add-img-single-add-btn-container">
                                                                            <button
                                                                                className={galleryCount < 9
                                                                                    ? "e-product-modal-add-img-single-add-btn"
                                                                                    : "e-product-modal-add-img-single-add-btn-alt"
                                                                                } onClick={handleAddImg} type="button">
                                                                                <span>Add an image</span>
                                                                            </button>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            </div>

                                            <div className="e-product-modal-add-img-submit-btn-container">
                                                {
                                                    !submitGalleryE && (
                                                        <button form="galleryForm" type="submit"
                                                            className=
                                                            {
                                                                galleryCount < 9
                                                                    ? "e-product-modal-add-img-submit-btn"
                                                                    : "e-product-modal-add-img-submit-btn-alt"
                                                            }
                                                        >Upload images</button>
                                                    )
                                                }
                                            </div>
                                        </form>
                                        <EditImgGallery
                                            className="detail-p-gallery-imgs-container"
                                            id={e.id}
                                            refreshGallery={closeModal}
                                            galleryCount={setGalleryCount}
                                        >
                                        </EditImgGallery>
                                        <div className="e-product-modal-img-gallery-container">
                                            <button className="ep-modal-close-modal-btn-slide-2" onClick={() => handleCloseModal(false)}>X</button>
                                            <div className="e-product-modal-img-container">
                                                <img className="e-product-modal-img" src={`http://localhost:3001/display/getPhotoProduct?id=${e.id}`} alt="none" />
                                            </div>
                                            <label className="e-product-modal-img-gallery-input-label">Change product cover photo
                                                <input
                                                    className="e-product-modal-img-gallery-input"
                                                    type="file"
                                                    name="photoProfile"
                                                    onChange={(e) => handleSubmitProductImg(e)}
                                                />
                                            </label>
                                            <div className="e-product-modal-prev-btn-container">
                                                <button onClick={prevSlide} className="e-product-modal-prev-btn">Edit product information</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </div>

                    )
                })
            }

        </div>
    )
}

export default EditProductModal;