import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, typeOfDeals, getAllTypesOfDeals } from "../../features/products/productsSlice";
import { validateRegister } from "../../Validations/validateRegister";
import { validateProduct } from "../../Validations/validateProduct"
import "./ListProduct.css"
import axios from "axios";

function ListProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTypeOfDeals = useSelector(typeOfDeals)

    const [slideNumber, setSlideNumber] = useState(0)
    const [imgList, setImgList] = useState([{ image: "" }])
    const [photoProduct, setPhotoProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: 0,
        typeOfProduct: "",
        typeOfDeal: []
    })

    useEffect(() => {
        const typesOfDealsLocal = dispatch(getAllTypesOfDeals())
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

    function handleSelect(e) {
        setInput({
            ...input,
            typeOfDeal: [...input.typeOfDeal, e.target.value]
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
        fd.append("typeOfProduct", input.typeOfProduct);
        fd.append("typeOfDeal", input.typeOfDeal);

        const fdProductImage = new FormData();
        fdProductImage.append("photoProduct", photoProduct, "photoProduct")


        try {
            const responseInput = await axios.post("http://localhost:3001/listNew/product", fd);
            if (responseInput.data.msgE) {
                setInput({
                    name: "",
                    description: "",
                    price: 0,
                    typeOfProduct: "",
                    typeOfDeal: ""
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
                price: 0,
                typeOfProduct: "",
                typeOfDeal: ""
            });
        } catch (e) {
            console.log(e)
            setInput({
                name: "",
                description: "",
                price: 0,
                typeOfProduct: "",
                typeOfDeal: ""
            });
        }
    }


    return (
        <div className="listProductContainer">
            <NavBar></NavBar>
            <form className="formContainerlistProduct" onSubmit={(e) => handleSubmit(e)}>
                {
                    slideNumber === 0 && (
                        <div className="allInputsContainerListProduct">
                            <div className="titleFormlistProduct">List your property!</div>

                            <div className="inputContainerListProduct">
                                <div className="textInputListProduct">Product name</div>
                                <input type="text"
                                    value={input.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product name"
                                    className="singleInputListProduct">
                                </input>
                                {errors.name && (
                                    <div className="errorProduct">{errors.name}</div>
                                )}
                            </div>

                            <div className="inputContainerListProduct">
                                <div className="textInputListProduct">Product price</div>
                                <input
                                    value={input.price}
                                    name="price"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product price"
                                    className="singleInputListProduct">
                                </input>
                                {errors.price && (
                                    <div className="errorProduct">{errors.price}</div>
                                )}
                            </div>

                            <div className="inputContainerDescriptionListProduct">
                                <div className="textInputListProduct">Product description</div>
                                <textarea type="text"
                                    value={input.description}
                                    name="description"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Your product description"
                                    className="singleInputDescriptionListProduct">
                                </textarea>
                                {errors.description && (
                                    <div className="errorProduct">{errors.description}</div>
                                )}
                            </div>

                            <div className="nextBtnContainerListProduct">
                                <button onClick={nextSlide} className="nextBtnListProduct">Next</button>
                            </div>
                        </div>
                    )
                }

                {
                    slideNumber === 1 && (
                        <div>
                            <div className="allSelectsContainerListProduct">
                                <div className="textSelectContainerListProduct">
                                    <div className="textInputListProduct">Type of deal</div>
                                    <div className="textInputListProduct">Type of property</div>
                                </div>
                                <div className="selectContainerListProduct">
                                    <select onChange={(e) => handleSelect(e)} className="singleSelectListProduct">
                                        {allTypeOfDeals && allTypeOfDeals.map((e) => {
                                            return (
                                                <option value={e.name}>{e.name}</option>
                                            )
                                        })}
                                    </select>
                                    <ul>
                                        {input.typeOfDeal.map((e) => {
                                            return (
                                                <li>{e + " "}</li>
                                            )

                                        })}
                                    </ul>
                                    <select onChange={(e) => handleSelectType(e)} className="singleSelectListProduct">
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Land">Land</option>
                                        <option value="Duplex">Duplex</option>
                                    </select>
                                    <div>{input.typeOfProduct}</div>
                                </div>
                            </div>
                            <input
                                type="file"
                                name="photoProfile"
                                onChange={handleImage}
                            />
                            <img src={photoProduct} alt="" />

                            <div className="prevBtnContainerListProduct">
                                <button onClick={prevSlide} className="prevBtnListProduct">Prev</button>
                            </div>
                            <div className="nextBtnContainerListProduct">
                                <button onClick={nextSlide} className="nextBtnListProduct">Next</button>
                            </div>

                        </div>
                    )
                }

                {
                    slideNumber === 2 && (
                        <div>
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
                            <div className="prevBtnContainerListProduct">
                                <button onClick={prevSlide} className="prevBtnListProduct">Prev</button>
                            </div>
                            <div className="submitBtnContainerListProduct">
                                <button type="submit" className="submitBtnListProduct">List property</button>
                            </div>
                        </div>
                    )
                }


            </form>
        </div>
    )
}

export default ListProduct;