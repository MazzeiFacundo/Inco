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
        if (e.target.value === input.secondTypeOfDeal) {
            return setInput({
                ...input,
                [e.target.name]: e.target.value
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
            return setInput({
                ...input,
                [e.target.name]: e.target.value
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
            if(userToken) fd.append("token", userToken);
            if(input.name !== "") fd.append("name", input.name);
            if(input.description !== "") fd.append("description", input.description);
            if(input.price !== "") fd.append("price", input.price);
            if(input.location !== "") fd.append("location", input.location)
            if(input.productWidth !== "") fd.append("productWidth", input.productWidth);
            if(input.productHeight !== "") fd.append("productHeight", input.productHeight);
            if(input.rooms !== "") fd.append("rooms", input.rooms);
            if(input.dorms !== "") fd.append("dorms", input.dorms);
            if(input.bathrooms !== "") fd.append("bathrooms", input.bathrooms);
            if(input.typeOfProduct !== "") fd.append("typeOfProduct", input.typeOfProduct);
            if(input.typeOfDeal !== "") fd.append("typeOfDeal", input.typeOfDeal);
            if (input.secondTypeOfDeal !== "") fd.append("secondTypeOfDeal", input.secondTypeOfDeal);
    
            const fdProductImage = new FormData();
            if(photoProduct.name) fdProductImage.append("photoProduct", photoProduct, "photoProduct")
    
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
                    if(imgListFiltered.length === 0) return
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
                                {errors.location && (
                                    <div className="list-p-form-errors">{errors.location}</div>
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
                                {
                                    errors.name ||
                                        errors.price ||
                                        errors.location ||
                                        errors.description ||
                                        input.name.length < 1
                                        ? <button onClick={nextSlide} className="list-p-btn-next-disabled">Next</button>
                                        : <button onClick={nextSlide} className="list-p-btn-next">Next</button>
                                }
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
                                        <div className="list-p-form-errors">{errors.typeOfDeal}</div>
                                    )}
                                </div>
                                <button onClick={(e) => handleSecondTypeOfDeal(e)}>Add a second deal</button>
                                {
                                    secondTypeOfDeal && (
                                        <div className="list-p-slide-1-typeofdeals-container">
                                            <button onClick={(e) => handleCloseSecondTypeOfDeal(e)}>X</button>
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
                                                <div className="list-p-form-errors">{errors.secondTypeOfDeal}</div>
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
                                        <div className="list-p-form-errors">{errors.typeOfProduct}</div>
                                    )}
                                </div>
                            </div>

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
                                        {errors.productWidth && (
                                            <div className="list-p-form-errors">{errors.productWidth}</div>
                                        )}
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
                                        {errors.productHeight && (
                                            <div className="list-p-form-errors">{errors.productHeight}</div>
                                        )}
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
                                        {errors.rooms && (
                                            <div className="list-p-form-errors">{errors.rooms}</div>
                                        )}
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
                                        {errors.dorms && (
                                            <div className="list-p-form-errors">{errors.dorms}</div>
                                        )}
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
                                        {errors.bathrooms && (
                                            <div className="list-p-form-errors">{errors.bathrooms}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                            ? <button onClick={prevSlide} className="list-p-btn-prev-disabled">Prev</button>
                                            : <button onClick={prevSlide} className="list-p-btn-prev">Prev</button>

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
                                            ? <button onClick={nextSlide} className="list-p-btn-next-disabled">Next</button>
                                            : <button onClick={nextSlide} className="list-p-btn-next">Next</button>
                                    }
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
                                                <label className="e-product-modal-add-img-single-input-label">Upload
                                                    <input
                                                        name="image"
                                                        type="file"
                                                        id="image"
                                                        
                                                        onChange={(e) => handleImgChange(e, index)}
                                                    />
                                                </label>
                                                {/* <img src={imgList[index].image}/> */}
                                                {
                                                    imgList.length - 1 === index && imgList.length < 9 &&
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