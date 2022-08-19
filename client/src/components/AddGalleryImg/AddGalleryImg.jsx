import React, { useState } from "react";
import "./AddGalleryImg.css"

function AddGalleryImg() {

    const [imgList, setImgList] = useState([{ image: "" }])

    const handleAddImg = () => {
        setImgList([...imgList, { image: "" }])
    }

    const handleRemoveImg = (index) => {
        const newList = [...imgList]
        newList.splice(index, 1);
        setImgList(newList)
    }

    const handleImgChange = (e, index) => {
        const { name, files } = e.target
        const newList = [...imgList]
        newList[index][name] = URL.createObjectURL(files[0]);
        setImgList(newList)
        console.log(e.target.files[0])
    }

    return (
        <form autoComplete="off">

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
        </form>
    )
}

export default AddGalleryImg;