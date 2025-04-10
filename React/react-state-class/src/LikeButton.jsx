import { useState } from "react"

export default function LikeButton() {
    let [isLiked, setIsLiked] = useState(false) //Jo set wala function hai uska naam same hona chahiye jo state variable ka hai, bas usmein 'set' prefix lagana hota hai. useState ko false isliye set kiya hai kyuki initially like nhi dikhana.
    // isLiked = false -> Unliked. 
    // isLiked = true -> Liked. 
    let toggleLike = () => {
        // console.log('we are toggling the like button')
        setIsLiked(!isLiked)
    }

    let likeStyle = {
        color: 'red',
    }

    return(
        <div>
            <p onClick={toggleLike}>
                {
                    isLiked ? (<i className="fa-solid fa-heart" style={likeStyle}></i>) : (<i className="fa-regular fa-heart"></i>)
                }
            </p>
        </div>
    )
}

// Closure : A closure is a feature in JavaScript where an inner function has access to the outer (enclosing)function's variables. In JS, once a function completes its execution, any variables that were defined inside the function scope cease to exist. (yaani delete/gayab ho jayenge). But, if you have a function defined inside another function, the inner function will have access to the outer function's variables. This is called a closure. 
// Yaani agr koi inner function hai jo ki uske outer variables ko access krna chahta hai to perform a certain operation, jab us inner function ko call lagaya jaata hai tab, wo outer function ke variables ko access kar sakta hai due to closure in Js. Inhi preserved variables ko apan scope chain keh sakte hai. Yaani kisi outer function ke andar defined inner function ko separately bhi use kiya jaa sakta hai, aur us case mein closure ki help se jo varibales hamein use krna hai, unko alag se preserve kiya jaata hai.