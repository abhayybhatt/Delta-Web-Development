import { useState } from "react"

export default function CommentsForm() {
    let [formData, setFormData] =  useState({
        username: '',
        remarks: '',
        rating: 5,
    })

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return {...currData, 
                [event.target.name] : event.target.value //[fieldName] : newValue
            }
        })
    }

    let handleSubmit = (event) => {
        console.log(formData)
        event.preventDefault()
        setFormData({
            username: '',
            remarks: '',
            rating: 5,
        })
    }

    return (
        <div>
            <h4>Your feedback matters! Please comment below: </h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User Name: </label>
                <input id="username" type="text" placeholder="username" value={formData.username}  onChange={handleInputChange} name="username"/>
                <br /><br />

                <label htmlFor="remarks">Remarks: </label>
                <textarea id="remarks" placeholder="Please add few remarks" value={formData.remarks} onChange={handleInputChange} name="remarks"></textarea>
                <br /><br />

                <label htmlFor="rating">Rating: </label>
                <input id="rating" type="number" placeholder="rating"  min={1} max={5} value={formData.rating} onChange={handleInputChange} name="rating"/>
                <br /><br />

                <button>Add Comment</button>
                <br /><br />
            </form>
        </div>
    )
}
