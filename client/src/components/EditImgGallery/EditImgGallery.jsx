import React, { useState, useEffect, componentWillUnmount } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditImgGallery.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { showProductGallery, getProductsGallery, deleteGalleryImage } from "../../features/products/productsSlice"
import axios from "axios";

function EditImgGallery({ id, galleryCount }) {

    const dispatch = useDispatch();
    const images = useSelector(showProductGallery)
    const [imagesRefresh, setimagesRefresh] = useState(0)
    const [componentRefresh, setComponentRefresh] = useState(0)
    const [imagesDisplay, setImagesDisplay] = useState({})
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const imagesGallery = dispatch(getProductsGallery(id))
        setTimeout(() => {
            setImagesDisplay(images)
            galleryCount(images.flat(1).length)
        }, 100)
    }, []);

    useEffect(() => {
        setimagesRefresh(imagesRefresh + 1)
    }, [componentRefresh]);

    const handleDelete = async (e, idImg) => {
        e.preventDefault();
        console.log("here")
        setComponentRefresh(componentRefresh + 1)
        try {
            dispatch(deleteGalleryImage(idImg))
            setTimeout(() => {
                dispatch(getProductsGallery(id))
                setimagesRefresh(imagesRefresh + 1)
            }, 200)
        } catch (error) {
            console.log(error)
        }
        setimagesRefresh(imagesRefresh + 1)
        galleryCount(images.flat(1).length - 1)
        console.log(galleryCount(images.flat(1).length - 1))
    }

    const handleSubmit = async (e, idImg) => {
        e.preventDefault()
        console.log(idImg)
        const fdGalleryImage = new FormData();
        fdGalleryImage.append("photoProduct", e.target.files[0], "photoProduct")

        try {
            const responseProductImg = await axios.post(`http://localhost:3001/listNew/galleryImageUpdate?id=${idImg}`,
                fdGalleryImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(getProductsGallery(id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenModal = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        document.body.style.overflow = 'unset';
    }

    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(images.flat(1).length - 1)
            : setSlideNumber(slideNumber - 1)

    }

    const nextSlide = () => {
        slideNumber + 1 === images.flat(1).length
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber + 1)
    }

    return (
        <div className="img-g-edit-general-container">
            <div className="img-g-edit-images-container">
                {
                    images && images.flat(1).map((el) => {
                        return (
                            <div
                                className="img-g-edit-images-single-container"
                                key={el.id}
                            >

                                <img className={"img-g-edit-images-single"}
                                    src={`http://localhost:3001/display/getPhotoGallery?id=${el.id}`} alt='none'
                                />
                                <div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name="photoProfile"
                                        className="img-g-edit-images-single-input"
                                        onChange={(e) => {
                                            console.log(el.id)
                                            handleSubmit(e, el.id)
                                        }}
                                    />
                                </div>
                                <div className="img-g-images-btns-container">
                                    <button
                                        className="img-g-single-img-delete-btn"
                                        type="button"
                                        onClick={(e) => {
                                            console.log(el.id)
                                            handleDelete(e, el.id)
                                            // handleGalleryCount(images.length)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditImgGallery;