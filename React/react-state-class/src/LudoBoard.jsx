import { useState } from "react"

export default function LudoBoard(){
    // let [blueMove, setBlueMove] = useState(0)
    // let [yellowMove, setYellowMove] = useState(0)
    // let [greenMove, setGreenMove] = useState(0)
    // let [redMove, setRedMove] = useState(0)
    // it'll work, lekin real-life scenarios mein aise bahut saare states hote hai jinko aise use krna is not feasible. Isliye we'll use object to store multiple states:
    let [moves, setMoves] = useState({blue: 0, yellow: 0, green: 0, red: 0})
    let [arr, setArr] = useState(['no moves'])

    let updateBlue = () =>{
        // moves.blue += 1
        // console.log(`moves.blue = ${moves.blue}`)
        // setMoves(moves) //bas itna kaafi nhi, moves ko detect nhi kr payega React kyuki Js mein jab kisi object ya array mein key ki value change hoti hai, tab bhi wo object same hi rehta hai. Aur hamara component tab render hota hai jab state ki value mein change detect hota hai, jo ki yha pr ho nhi rha, sirf object ki key value mein change ho rha hai. Aise mein object mein change laane ke liye us pure object ko copy krna hota hai jiske pass apna address ho so that Js can detect ki pure object mein change aaya hai. Yeh cheez dono objects aur arrays mein follow krni hoti hai.
        //So, to re-render our object we'll use spread operator on the object, aisa krne se ek naya object banega (yaani new address) with the same properties as the old object, lekin usmein jo changes kiye gaye hai wo reflect honge. 
        // setMoves({...moves, blue: moves.blue + 1}) //ye ho gya spread operator ka use. Jab bhi kisi object ko re-render karana ho, usko pehle spread krte hai aur fir agr kuch updations chahiye hote hai to uske saath , krke pass krdete hai. Lekin since yha jo purani value hai wo hamari new value pr depend krti hai, to aise cases mein hamesha callback function ka use krna hai:

        setMoves((preMoves) => {
            return {...preMoves, blue: preMoves.blue + 1} 
        })

        // arr.push('blue moves')
        setArr((prevArr)=> {
            return [...prevArr, 'blue moves']
        })
        console.log(arr)
    }

    let updateYellow = () => {
        setMoves((preMoves)=>{
            return {...preMoves, yellow: preMoves.yellow + 1}
        })
    }

    let updateGreen = () =>{
        setMoves((preMoves)=>{
            return {...preMoves, green: preMoves.green + 1}
        })
    }

    let updateRed = () =>{
        setMoves((preMoves)=>{
            return {...preMoves, red: preMoves.red + 1}
        })
    }

    return(
        <div>
            <p>Game begins!</p>
            <p>{arr}</p>
            <div className="board">
                <p>Blue moves = {moves.blue}</p> {/* moves object ki 'blue' key  ko access kr rahe hai.*/}
                <button style={{ backgroundColor: 'blue'}} onClick={updateBlue}>+1</button>
                <p>Yellow moves = {moves.yellow}</p>
                <button style={{backgroundColor: 'yellow', color: "black"}} onClick={updateYellow}>+1</button>
                <p>Green moves = {moves.green} </p>
                <button style={{backgroundColor: 'green'}} onClick={updateGreen}>+1</button>
                <p>Red moves = {moves.red} </p>
                <button style={{backgroundColor: 'red'}} onClick={updateRed}>+1</button>
            </div>
        </div>
    )
}