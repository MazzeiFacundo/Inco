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
    }

    const handleCloseModal = () => {
        setOpenModal(false)

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
        <div className="galleryContainer">
            {
                openModal && 
                <div className="sliderWrap">
                    <FontAwesomeIcon onClick={handleCloseModal} icon={faCircleXmark} className='btnClose'/>
                    <FontAwesomeIcon onClick={prevSlide} icon={faCircleChevronLeft} className='btnPrev'/>
                    <FontAwesomeIcon onClick={nextSlide} icon={faCircleChevronRight} className='btnNext'/>
                    <div className="fullScreenImg">
                        <img src={`http://localhost:3001/display/getPhotoGallery?id=${images.flat(1)[slideNumber].id}`} alt=''/>
                    </div>
                    <div>{slideNumber + 1} of {images.flat(1).length}</div>
                </div>
            }


            <div className="galleryWrap">
                {
                   images && images.flat(1).map((e, index) => {
                    return (
                        <div 
                        className="single" 
                        key={index}
                        onClick={() => handleOpenModal(index)}
                        >
                            <img src={`http://localhost:3001/display/getPhotoGallery?id=${e.id}`} alt='none'/>
                        </div>
                    )
                   })
                }
            </div>
        </div>
    )
}

export default ImgGallery;