import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../features/products/productsSlice";
import { validateRegister } from "../../Validations/validateRegister";
import { validateProduct } from "../../Validations/validateProduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faExchangeAlt, faDoorOpen, faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import logo from "../NavBar/Inco.png"
import map from "../map.png"
import houseSlide1 from "../house1.jpg"
import houseSlide2 from "../house2.jpg"
import houseSlide3 from "../house3.jpg"
import logotext from "../logotext.png"
import "./ListProduct.css"
import axios from "axios";

function ListProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [slideNumber, setSlideNumber] = useState(0)
    const [secondTypeOfDeal, setSecondTypeOfDeal] = useState(false)
    const [imgList, setImgList] = useState([{ image: "" }])
    const [photoProduct, setPhotoProduct] = useState({});
    const [errors, setErrors] = useState({});
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

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        console.log(JSON.parse(userCredentials))
        if (!userToken) {
            navigate("/home");
        }
    }, []);

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

    const handleImage = (e) => {
        console.log(e.target.files[0]);
        setPhotoProduct(e.target.files[0]);
        console.log(photoProduct);
    };

    const handleSecondTypeOfDeal = (e) => {
        e.preventDefault()
        setSecondTypeOfDeal(true)
    };

    const handleCloseSecondTypeOfDeal = (e) => {
        e.preventDefault()
        setSecondTypeOfDeal(false)
        setInput({
            ...input,
            secondTypeOfDeal: ""
        })
    };

    const prevSlide = (e) => {
        e.preventDefault()
        slideNumber === 0
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber - 1)

    }

    const nextSlide = (e) => {
        e.preventDefault()
        slideNumber === 2
            ? setSlideNumber(2)
            : setSlideNumber(slideNumber + 1)
    }

    function handleChange(e) {
        console.log(e.target.name)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
        console.log(input)
    }

    function handleSelectTypeOfDeal(e) {
        if (e.target.value === input.secondTypeOfDeal) {
            setErrors({ typeOfDeal: "You cannot list identical deals" })
            setInput({
                ...input,
                typeOfDeal: ""
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
        setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
    }

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
        setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
    }

    function handleSelectType(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        const fd = new FormData();
        if (userToken) fd.append("token", userToken);
        if (input.name !== "") fd.append("name", input.name);
        if (input.description !== "") fd.append("description", input.description);
        if (input.price !== "") fd.append("price", input.price);
        if (input.location !== "") fd.append("location", input.location)
        if (input.productWidth !== "") fd.append("productWidth", input.productWidth);
        if (input.productHeight !== "") fd.append("productHeight", input.productHeight);
        if (input.rooms !== "") fd.append("rooms", input.rooms);
        if (input.dorms !== "") fd.append("dorms", input.dorms);
        if (input.bathrooms !== "") fd.append("bathrooms", input.bathrooms);
        if (input.typeOfProduct !== "") fd.append("typeOfProduct", input.typeOfProduct);
        if (input.typeOfDeal !== "") fd.append("typeOfDeal", input.typeOfDeal);
        if (input.secondTypeOfDeal !== "") fd.append("secondTypeOfDeal", input.secondTypeOfDeal);

        const fdProductImage = new FormData();
        if (photoProduct.name) fdProductImage.append("photoProduct", photoProduct, "photoProduct")

        console.log("start")

        try {
            console.log("trycatch1")
            const responseInput = await axios.post("http://localhost:3001/listNew/product", fd);
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

            try {
                console.log("trycatch2")
                const responseProductImg = await axios.post(`http://localhost:3001/listNew/productImage?id=${responseInput.data.productCreated.id}`,
                    fdProductImage, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (e) {
                console.log(e)
            }

            try {
                console.log("trycatch3")
                const singleImgResponse = async () => {
                    const imgListFiltered = imgList.filter((e) => { return typeof e.image.name === "string" })
                    if (imgListFiltered.length === 0) return
                    const images = await Promise.all(imgListFiltered.map(img => {
                        let fdProductGallery = new FormData();
                        fdProductGallery.append("photoGallery", img.image, "photoGallery")
                        return axios.post(`http://localhost:3001/listNew/galleryImage?id=${responseInput.data.productCreated.id}`,
                            fdProductGallery, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    }))
                    return images
                }
                singleImgResponse()
            } catch (e) {
                console.log(e)
            }

        } catch (e) {
            console.log(e)
        }




        navigate("/home");
    }


    return (
        <div className="list-p-container">
            <NavBar></NavBar>
            <form className="list-p-form-container" onSubmit={(e) => handleSubmit(e)}>
                {
                    slideNumber === 0 && (
                        <div className="list-p-slide-0-container">
                            <div className="list-p-slide-0-title-container">
                                <div className="list-p-slide-0-title">List your property!</div>
                                <div className="list-p-btn-next-container">
                                    {
                                        errors.name ||
                                            errors.price ||
                                            errors.location ||
                                            errors.description ||
                                            input.name.length < 1
                                            ? <button type="button" className="list-p-btn-next-disabled">Next</button>
                                            : <button type="button" onClick={nextSlide} className="list-p-btn-next">Next</button>
                                    }
                                </div>
                            </div>

                            <div className="list-p-slide-0-single-input-container">
                                <div className="list-p-slide-0-input-title">Product name</div>
                                <input type="text"
                                    autocomplete="off"
                                    value={input.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product name"
                                    className="list-p-slide-0-input-field">
                                </input>
                                {errors.name && (
                                    <div className="list-p-form-errors">{errors.name}</div>
                                )}
                            </div>

                            <div className="list-p-slide-0-single-input-container">
                                <div className="list-p-slide-0-input-title">Product price</div>
                                <span className="list-p-price-span">
                                    <input
                                        autocomplete="off"
                                        value={input.price}
                                        name="price"
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Your product price"
                                        className="list-p-slide-0-input-field">
                                    </input>
                                </span>
                                {errors.price && (
                                    <div className="list-p-form-errors">{errors.price}</div>
                                )}
                            </div>

                            <div className="list-p-slide-0-single-input-container">
                                <div className="list-p-slide-0-input-title">Product location</div>
                                <input
                                    autocomplete="off"
                                    value={input.location}
                                    name="location"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product location"
                                    className="list-p-slide-0-input-field">
                                </input>
                                {errors.location && (
                                    <div className="list-p-form-errors">{errors.location}</div>
                                )}
                            </div>

                            <div className="list-p-slide-0-single-input-container-desc">
                                <div className="list-p-slide-0-input-title">Product description</div>
                                <textarea type="text"
                                    autocomplete="off"
                                    value={input.description}
                                    name="description"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product description"
                                    className="list-p-slide-0-input-field-desc">
                                </textarea>
                                {errors.description && (
                                    <div className="list-p-form-errors-desc">{errors.description}</div>
                                )}
                            </div>



                        </div>
                    )
                }

                {
                    slideNumber === 1 && (
                        <div className="list-p-slide-1-container">
                            <div className="list-p-slide-1-btns-container">
                                <div className="list-p-btn-prev-container">
                                    {
                                        errors.typeOfDeal ||
                                            errors.secondTypeOfDeal ||
                                            errors.productWidth ||
                                            errors.productHeight ||
                                            errors.rooms ||
                                            errors.dorms ||
                                            errors.bathrooms ||
                                            input.rooms.length < 1
                                            ? <button type="button" className="list-p-btn-prev-disabled">Prev</button>
                                            : <button type="button" onClick={(e) => prevSlide(e)} className="list-p-btn-prev">Prev</button>

                                    }
                                </div>

                                <div className="list-p-btn-next-container">
                                    {
                                        errors.typeOfDeal ||
                                            errors.secondTypeOfDeal ||
                                            errors.productWidth ||
                                            errors.productHeight ||
                                            errors.rooms ||
                                            errors.dorms ||
                                            errors.bathrooms ||
                                            input.rooms.length < 1
                                            ? <button type="button" className="list-p-btn-next-disabled">Next</button>
                                            : <button type="button" onClick={(e) => nextSlide(e)} className="list-p-btn-next">Next</button>
                                    }
                                </div>
                            </div>
                            <div className="list-p-slide-1-specifications-header">Property specifications</div>
                            <div className="list-p-slide-1-selects-container">
                                <div className="list-p-slide-1-typeofdeals-container">
                                    <select
                                        onChange={(e) => handleSelectTypeOfDeal(e)}
                                        className="list-p-slide-1-select-typeofdeal"
                                        value={input.typeOfDeal}
                                        name="typeOfDeal"
                                    >
                                        <option value="" selected disabled hidden>Select a deal</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Touristic rent">Touristic rent</option>
                                    </select>
                                    {errors.typeOfDeal && (
                                        <div className="list-p-form-errors-selects">{errors.typeOfDeal}</div>
                                    )}
                                </div>
                                {
                                    !secondTypeOfDeal && (
                                        <button
                                            type="button"
                                            className="list-p-add-seconddeal-btn"
                                            onClick={(e) => handleSecondTypeOfDeal(e)}
                                        >Add a second deal</button>
                                    )
                                }

                                {
                                    secondTypeOfDeal && (
                                        <div className="list-p-slide-1-second-typeofdeals-container">
                                            <button
                                                type="button"
                                                className="list-p-slide-1-remove-seconddeal"
                                                onClick={(e) => handleCloseSecondTypeOfDeal(e)}
                                            >X</button>
                                            <select
                                                onChange={(e) => handleSelectSecondTypeOfDeal(e)}
                                                className="list-p-slide-1-select-typeofdeal"
                                                value={input.secondTypeOfDeal}
                                                name="secondTypeOfDeal"
                                            >
                                                <option value="" selected disabled hidden>Select a deal</option>
                                                <option value="Sale">Sale</option>
                                                <option value="Rent">Rent</option>
                                                <option value="Touristic rent">Touristic rent</option>
                                            </select>
                                            {errors.secondTypeOfDeal && (
                                                <div className="list-p-form-errors-selects-second">{errors.secondTypeOfDeal}</div>
                                            )}
                                        </div>
                                    )
                                }
                                <div className="list-p-slide-1-typeofproducts-container">
                                    <select
                                        onChange={(e) => handleSelectType(e)}
                                        className="list-p-slide-1-select-typeofproperty"
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
                                        <div className="list-p-form-errors-selects">{errors.typeOfProduct}</div>
                                    )}
                                </div>
                            </div>

                            <div className="list-p-slide-1-general-inputs-container">
                                <div className="list-p-slide-1-measurments-header">Measurments</div>
                                <div className="list-p-slide-1-general-inputs-measurments-container">
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Width</div>
                                        <input
                                            autocomplete="off"
                                            value={input.productWidth}
                                            name="productWidth"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faExchangeAlt} className='heightIcon'></FontAwesomeIcon>

                                    </div>

                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Height</div>
                                        <input
                                            autocomplete="off"
                                            value={input.productHeight}
                                            name="productHeight"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faLongArrowAltUp} className='heightIcon'></FontAwesomeIcon>

                                    </div>
                                    {
                                        errors.productWidth && (
                                            <div className="list-p-form-errors-small-input">{errors.productWidth}</div>
                                        )
                                    }
                                    {
                                        errors.productHeight && (
                                            <div className="list-p-form-errors-small-input">{errors.productHeight}</div>
                                        )
                                    }
                                </div>
                                <div className="list-p-slide-1-accomodations-header">Accomodations</div>
                                <div className="list-p-slide-1-general-inputs-accomodations-container">
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Rooms</div>
                                        <input
                                            autocomplete="off"
                                            value={input.rooms}
                                            name="rooms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faDoorOpen} className='heightIcon'></FontAwesomeIcon>

                                    </div>
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Dorms</div>
                                        <input
                                            autocomplete="off"
                                            value={input.dorms}
                                            name="dorms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faBed} className='heightIcon'></FontAwesomeIcon>

                                    </div>
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Bathrooms</div>
                                        <input
                                            autocomplete="off"
                                            value={input.bathrooms}
                                            name="bathrooms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faBath} className='heightIcon'></FontAwesomeIcon>

                                    </div>
                                    {
                                        errors.rooms && (
                                            <div className="list-p-form-errors-small-input">{errors.rooms}</div>
                                        )
                                    }
                                    {
                                        errors.dorms && (
                                            <div className="list-p-form-errors-small-input">{errors.dorms}</div>
                                        )
                                    }
                                    {
                                        errors.bathrooms && (
                                            <div className="list-p-form-errors-small-input">{errors.bathrooms}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    slideNumber === 2 && (
                        <div className="list-p-slide-2-container">

                            <div className="list-p-slide-2-btns-container">
                                <div className="list-p-btn-prev-container">
                                    <button onClick={prevSlide} className="list-p-btn-prev">Prev</button>
                                </div>
                                <div className="list-p-btn-submit-container">
                                    <button type="submit" className="list-p-btn-submit">List property</button>
                                </div>
                            </div>

                            <label className="list-p-slide-2-gallery-label">Upload your property cover photo</label>

                            <div className="list-p-slide-2-main-photo-container">
                                <label className="list-p-slide-2-main-img-label">Upload
                                    <input
                                        className="e-product-modal-add-main-img-single-input"
                                        type="file"
                                        name="photoProfile"
                                        onChange={handleImage}
                                    />
                                </label>
                                <div className="list-p-slide-2-main-photo-displayer">
                                    {
                                        photoProduct.name && photoProduct.name.length >= 17
                                            ? photoProduct.name.slice(0, 17)
                                            : photoProduct.name
                                    }
                                </div>
                            </div>
                            <label className="list-p-slide-2-gallery-label">Upload photos for your property gallery</label>
                            <div className="list-p-slide-2-all-cards-container">
                                {imgList.map((img, index) => {
                                    console.log(imgList)
                                    return (
                                        <div
                                            className="list-p-slide-2-single-input-container"
                                            key={index}
                                        >
                                            <div className="list-p-slide-2-single-input-btns-container">
                                                <div>
                                                    <label className="list-p-slide-2-gallery-img-label">Upload
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            id="image"
                                                            onChange={(e) => handleImgChange(e, index)}
                                                        />
                                                    </label>
                                                    {/* <img src={imgList[index].image}/> */}

                                                </div>
                                                {
                                                    imgList.length - 1 === index && imgList.length < 9 &&
                                                    <button
                                                        className="list-p-slide-2-single-input-add-btn"
                                                        onClick={handleAddImg} type="button">
                                                        <span>+</span>
                                                    </button>
                                                }
                                                <div>
                                                    {
                                                        imgList.length > 1 &&
                                                        <button className="list-p-slide-2-gallery-img-btn-remove" onClick={(() => handleRemoveImg(index))} type="button">
                                                            <span>Remove</span>
                                                        </button>
                                                    }
                                                </div>
                                            </div>



                                            <div className="e-product-modal-add-img-single-input-name">
                                                {
                                                    img.image.name &&
                                                        img.image.name.length >= 10
                                                        ? img.image.name.substring(0, img.image.name.indexOf(".")).substring(0, 10) + "." + img.image.name.split('.').pop()
                                                        : img.image.name
                                                }

                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    )
                }


            </form>
            {
                slideNumber === 0 && (
                    <div className="list-p-slide-0-carrousel-container">
                        <img className="list-p-slide-0-carrousel" src={houseSlide1}></img>
                    </div>
                )
            }

            {
                slideNumber === 1 && (
                    <div className="list-p-slide-0-carrousel-container">
                        <img className="list-p-slide-0-carrousel" src={houseSlide2}></img>
                    </div>
                )
            }

            {
                slideNumber === 2 && (
                    <div className="list-p-slide-0-carrousel-container">
                        <img className="list-p-slide-0-carrousel" src={houseSlide3}></img>
                    </div>
                )
            }
        </div>
    )
}

export default ListProduct;