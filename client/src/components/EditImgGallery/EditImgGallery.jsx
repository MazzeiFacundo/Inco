import React, { useState, useEffect, componentWillUnmount } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditImgGallery.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { showProductGallery, getProductsGallery, deleteGalleryImage } from "../../features/products/productsSlice"
import axios from "axios";

function EditImgGallery(id) {

    const dispatch = useDispatch();
    const images = useSelector(showProductGallery)
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const imagesGallery = dispatch(getProductsGallery(id.id))
    }, []);

    // componentWillUnmount(() => {
    //     console.log("desmontado")
    // })


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

    const handleSubmit = async (e, id) => {
        console.log(id)
        console.log(e.target.files[0]);
        const fdGalleryImage = new FormData();
        fdGalleryImage.append("photoProduct", e.target.files[0], "photoProduct")

        try {
            const responseProductImg = await axios.post(`http://localhost:3001/listNew/galleryImageUpdate?id=${id}`,
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

    // const closeModalOnClick = () => {
    //     setOpenModal(false)
    // }

    return (
        <div className="img-g-general-container">
            {
                openModal &&
                <div className="img-g-modal-container">
                    <FontAwesomeIcon onClick={handleCloseModal} icon={faCircleXmark} className='img-g-modal-btn-close' />
                    <FontAwesomeIcon onClick={prevSlide} icon={faCircleChevronLeft} className='img-g-modal-btn-prev' />
                    <FontAwesomeIcon onClick={nextSlide} icon={faCircleChevronRight} className='img-g-modal-btn-next' />
                    <div className="img-g-modal-img-container">
                        <img src={`http://localhost:3001/display/getPhotoGallery?id=${images.flat(1)[slideNumber].id}`} alt='' />
                    </div>
                </div>
            }


            <div className="img-g-images-container">
                {
                    images && images.flat(1).map((el, index) => {
                        return (
                            <div
                                className="img-g-images-single-container"
                                key={index}
                                onClick={() => handleOpenModal(index)}
                            >
                                <img className={"img-g-images-single"}
                                    src={`http://localhost:3001/display/getPhotoGallery?id=${el.id}`} alt='none'
                                />
                                <input
                                    type="file"
                                    name="photoProfile"
                                    onChange={(e) => {
                                        console.log(el.id)
                                        handleSubmit(e, el.id)}}
                                />
                                <button type="button" onClick={() => {
                                    dispatch(deleteGalleryImage(el.id))
                                }}>
                                    Delete image</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditImgGallery;