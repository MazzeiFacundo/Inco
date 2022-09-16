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
    };

    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber - 1)

    }

    const nextSlide = () => {
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
        if(e.target.value === input.secondTypeOfDeal) {
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

    function handleSelectSecondTypeOfDeal(e) {
        if(e.target.value === input.typeOfDeal) {
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


    function handleSelectType(e) {
        setInput({
            ...input,
            typeOfProduct: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors(validateProduct({ ...input, [e.target.name]: e.target.value }))
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);

        const fd = new FormData();
        fd.append("token", userToken);
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
        if(input.secondTypeOfDeal !== "") fd.append("secondTypeOfDeal", input.secondTypeOfDeal);
       
        const fdProductImage = new FormData();
        fdProductImage.append("photoProduct", photoProduct, "photoProduct")


        try {
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
            const responseProductImg = await axios.post(`http://localhost:3001/listNew/productImage?id=${responseInput.data.productCreated.id}`,
                fdProductImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const singleImgResponse = async () => {
                const images = await Promise.all(imgList.map(img => {
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

            navigate("/home");
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
        <div className="list-p-container">
            <NavBar></NavBar>
            <form className="list-p-form-container" onSubmit={(e) => handleSubmit(e)}>
                {
                    slideNumber === 0 && (
                        <div className="list-p-slide-0-container">
                            <div className="list-p-slide-0-title">List your property!</div>

                            <div className="list-p-slide-0-single-input-container">
                                <div className="list-p-slide-0-input-title">Product name</div>
                                <input type="text"
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
                                <input
                                    value={input.price}
                                    name="price"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product price"
                                    className="list-p-slide-0-input-field">
                                </input>
                                {errors.price && (
                                    <div className="list-p-form-errors">{errors.price}</div>
                                )}
                            </div>

                            <div className="list-p-slide-0-single-input-container">
                                <div className="list-p-slide-0-input-title">Product location</div>
                                <input
                                    value={input.location}
                                    name="location"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product location"
                                    className="list-p-slide-0-input-field">
                                </input>
                                {errors.price && (
                                    <div className="list-p-form-errors">{errors.price}</div>
                                )}
                            </div>

                            <div className="list-p-slide-0-single-input-container-desc">
                                <div className="list-p-slide-0-input-title">Product description</div>
                                <textarea type="text"
                                    value={input.description}
                                    name="description"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product description"
                                    className="list-p-slide-0-input-field-desc">
                                </textarea>
                                {errors.description && (
                                    <div className="list-p-form-errors">{errors.description}</div>
                                )}
                            </div>

                            <div className="list-p-btn-next-container">
                                <button onClick={nextSlide} className="list-p-btn-next">Next</button>
                            </div>
                        </div>
                    )
                }

                {
                    slideNumber === 1 && (
                        <div className="list-p-slide-1-container">
                            <div className="list-p-slide-1-specifications-header">Property specifications</div>
                            <div className="list-p-slide-1-selects-container">
                                <div className="list-p-slide-1-typeofdeals-container">
                                    <select onChange={(e) => handleSelectTypeOfDeal(e)} className="list-p-slide-1-select-typeofdeal">
                                        <option value="Sale">Sale</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Touristic rent">Touristic rent</option>
                                    </select>
                                </div>
                                <button onClick={(e) => handleSecondTypeOfDeal(e)}>Add a second deal</button>
                                {
                                    secondTypeOfDeal && (
                                        <div className="list-p-slide-1-typeofdeals-container">
                                            <button onClick={(e) => handleCloseSecondTypeOfDeal(e)}>X</button>
                                            <select onChange={(e) => handleSelectSecondTypeOfDeal(e)} className="list-p-slide-1-select-typeofdeal">
                                                <option value="Sale">Sale</option>
                                                <option value="Rent">Rent</option>
                                                <option value="Touristic rent">Touristic rent</option>
                                            </select>
                                        </div>
                                    )
                                }
                                <div className="list-p-slide-1-typeofproducts-container">
                                    <select onChange={(e) => handleSelectType(e)} className="list-p-slide-1-select-typeofproperty">
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Land">Land</option>
                                        <option value="Duplex">Duplex</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="list-p-slide-1-displayer-containers">
                                <div className="list-p-slide-1-displayer">
                                    <div className="list-p-slide-1-typeofdeals-list">
                                        {input.typeOfDeal.map((e) => {
                                            return (
                                                <div className="list-p-slide-1-typeofdeals-list-item">{e + " "}</div>
                                            )

                                        })}
                                    </div>
                                </div>
                                <div className="list-p-slide-1-displayer">
                                    <div className="list-p-slide-1-typeofproducts-list">{input.typeOfProduct}</div>
                                </div>
                            </div> */}

                            <div className="list-p-slide-1-general-inputs-container">
                                <div className="list-p-slide-1-measurments-header">Measurments</div>
                                <div className="list-p-slide-1-general-inputs-measurments-container">
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Width</div>
                                        <input
                                            value={input.productWidth}
                                            name="productWidth"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faExchangeAlt} className='heightIcon'></FontAwesomeIcon>
                                        {/* {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )} */}
                                    </div>

                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Height</div>
                                        <input
                                            value={input.productHeight}
                                            name="productHeight"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faLongArrowAltUp} className='heightIcon'></FontAwesomeIcon>
                                        {/* {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )} */}
                                    </div>
                                </div>
                                <div className="list-p-slide-1-accomodations-header">Accomodations</div>
                                <div className="list-p-slide-1-general-inputs-accomodations-container">
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Rooms</div>
                                        <input
                                            value={input.rooms}
                                            name="rooms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faDoorOpen} className='heightIcon'></FontAwesomeIcon>
                                        {/* {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )} */}
                                    </div>
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Dorms</div>
                                        <input
                                            value={input.dorms}
                                            name="dorms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faBed} className='heightIcon'></FontAwesomeIcon>
                                        {/* {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )} */}
                                    </div>
                                    <div className="list-p-slide-1-single-input-container">
                                        <div className="">Bathrooms</div>
                                        <input
                                            value={input.bathrooms}
                                            name="bathrooms"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="0"
                                            className="list-p-slide-1-single-input">
                                        </input>
                                        <FontAwesomeIcon icon={faBath} className='heightIcon'></FontAwesomeIcon>
                                        {/* {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )} */}
                                    </div>
                                </div>
                            </div>
                            <div className="list-p-slide-1-btns-container">
                                <div className="list-p-btn-prev-container">
                                    <button onClick={prevSlide} className="list-p-btn-prev">Prev</button>
                                </div>
                                <div className="list-p-btn-next-container">
                                    <button onClick={nextSlide} className="list-p-btn-next">Next</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    slideNumber === 2 && (
                        <div>
                            <input
                                type="file"
                                name="photoProfile"
                                onChange={handleImage}
                            />
                            <img src={photoProduct} alt="" />
                            <div>
                                <label>Image</label>

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
                                                {/* <img src={imgList[index].image}/> */}
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

                            </div>
                            <div>
                                <h2>Images:</h2>
                                {
                                    imgList.map((img, index) => {
                                        return (
                                            <img src={imgList[index].image}></img>
                                        )
                                    })
                                }
                            </div>
                            <div className="list-p-btn-prev-container">
                                <button onClick={prevSlide} className="list-p-btn-prev">Prev</button>
                            </div>
                            <div className="list-p-btn-submit-container">
                                <button type="submit" className="list-p-btn-submit">List property</button>
                            </div>
                        </div>
                    )
                }


            </form>
            {
                slideNumber === 0 && (
                    <div className="list-p-slide-0-containerText">
                        <img className="list-p-slide-0-img-logo" src={logotext}></img>
                        <div>
                            <img className="list-p-slide-0-img-map" src={map}></img>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListProduct;