import React, { useState, useEffect, componentWillUnmount } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImgGallery.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { showProductGallery, getProductsGallery } from "../../features/products/productsSlice"

function ImgGallery(id) {

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
                        <img className="img-g-modal-img" src={`http://localhost:3001/display/getPhotoGallery?id=${images.flat(1)[slideNumber].id}`} alt='' />
                    </div>
                    {/* <div>{slideNumber + 1} of {images.flat(1).length}</div> */}
                </div>
            }


            <div className="img-g-images-container">
                {
                    images && images.flat(1).map((e, index) => {
                        return (
                            <div
                                className="img-g-images-single-container"
                                key={index}
                                onClick={() => handleOpenModal(index)}
                            >
                                <img className={`${index < 4 ? "img-g-images-single" : "img-g-images-single-hidden"}`}
                                    src={`http://localhost:3001/display/getPhotoGallery?id=${e.id}`} alt='none'
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImgGallery;