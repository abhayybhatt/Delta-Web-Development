// • We are given Lottery tickets with a 3 digit number
// • The number is generated randomly
// • If the sum of all digits is 15, we win the lottery & get the prize

import { useState } from "react"
// import './Lottery.css'
import { genTicket, sum} from "./helper"
import Ticket from "./Ticket"
import Button from "./Button"

// export default function Lottery() {
//     let [ticket, setTicket] = useState(genTicket(3)) //3 random nos. wala array generate krega.
//     let isWinning = sum(ticket) === 15//sum nikalwana hai apne saare ticket ke numbers ka. Agr sum aaya 15 ke equal to ye isWinning varibale will be set to true. Pr ye winning condition bhi "hard-coded" hai. Yaani limited in terms of flexibility, agr aage kuch aur winning condition hogi to code mein wapis yha changes krni padengi. Instead, we should set winning sum to be any feasible number. So that aage agr hamein changes laani ho yha to zyada changes na krni pade. Aisi basic aur general cheezon ke baarein mein soch lena chahiye before desigining our components. To apan hierarchy aise rakh sakte hai: App -> Lottery -> Ticket.. to har ek yha pr component hai, App sabka parent component hai aur wo kuch prop(s) Lottery ko dega, Lottery Ticket ko prop de sakta hai and so on. Ye sab with practice samajh mein aayega.
    // Hierarchy decide hone ke baad we should think about our state - ticket variable jismein state change ho rhi hai usko kaunse component mein rakha jaye. Since apan Ticket nos. wale components, ya Ticket component mein winning condition ko check nhi krenge, kyuki wo condition to winning sum pr depend kregi, jiko Lottery component se Ticket component mein pass krne ka koi logic nhi hai. Winning sum to hamare Lottery wale game ke pass hona chahiye. Aur for ex let's say ki apan ne fir bhi apne ticket array ko Ticket component mein pass kr diya, lekin fir apan state ko upar wale hierarchy level pr pass nhi kr payenge. Kyuki apan kabhi bhi state ko apni hierarchy level ke upar pass nhi kr sakte. Koi bhi state variable sirf hierarchy mein neeche hi pass ho sakta hai, upar nhi. 
    // Hence, agr ticket[] ko Lottery component mein rakha jayega to usko Ticket component mein pass kr sakte hai in the form of props. Information hierachy mein upar se neeche hi pass hoti hai in the form of props. Isliye it is important to understand this  Design Principle or Design Pattern, yaani apne code ko likhne ka ek specific tarika.
    // React ke andar ek State Design Pattern hota hai - Lifting State Up. 
    // Sharing State Between Components: Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it's one of the most common things you will do writing React code. Pr itna hi lift krna hai state ko jisse apni requirements puri ho jaye, nhi to saari states apan bina soche App component mein bhi bhejne lag jayenge!
    // Thus, hamara ticket[] which is a state variable, Lottery component mein hi aayega. Isko baad ki hierarchy wale components mein pass kiya jaa sakta hai in the form of props.

    // let buyTicket = () => {
    //     setTicket(genTicket(3)) //yaani Buy New Ticket button pr click krne se ye function execute hoga jo ki setTicket function ko call krega, which will again create new ticket consisting of 3 random nos.
    // } 

//     return (
//         <div>
//             <h1>Lottery Game!</h1>
//             <div className="ticket">
//                 <span>{ticket[0]}</span>
//                 <span>{ticket[1]}</span>
//                 <span>{ticket[2]}</span> {/*In terms of scalability, not a good practice kyuki apan ne hard code kr diya yaani fixed length ka hi ticket rhega, pr as a developer ye sochna chahiye ki aaj 3 digits ka ticket hai pr kal ko aur bhi digits add krni pad sakti hai, isliye we'll make the lottery tickets of N digit number. */}
//             </div>
//             <br />
//             <button onClick={buyTicket}>Buy New Ticket</button>
//             <h3>{isWinning && 'Congratulations! You won the Lottery!'}</h3> {/*agr isWinning variable true hoga, to us case mein Congratulations message bhi print ho jayega. Agr false hua to print nhi hoga ye message.*/}
//         </div>
//     )
// }

// ye to ho gya ki saara code apan ne ek hi .jsx file mein likh diya. pr aisa hota nhi hai, components ki hierarchy banti hai. Isliye ab apan component ki destructuring krenge aur unko distribute krenge while maintaining a hierarchy of it.

// Changes to Lottery Game:
// • Make the Lottery tickets of N digit number
// • The Winning Sum could be any feasible number

// Component Types: 2 types - functional and class components ke baare mein padh liya hai. Ab dusre basis pr iska division kr rhe hai: 
// 1. Logical components (smart components): In components mein state varibale hote hai. State change hoti hai to kuch logic bhi use hota hai. Thus, jis component ke andar apan ticket[] ko as a state variable use krenge wo apna logical component ho jayega.
// 2. Presentational components (dumb components): In components ka ek single goal hai - to design UI. Used for very basic and simple work. They do not have any state variable. In components ke andar props ho sakte hai, pr state nhi hota.

// From our Lottery game example: Lottery  component apna Logical component hai aur Ticket component apna Presentational component hai kyuki wo sirf tickets ko display karane ka kaam karayega. Similarly, individual TicketNum components ke pass ek no. aayega in the form of props. Lottery component mein ticket nos. in the form of array rhenge. Ticket component un nos. ko breakdown kr dega into individual nos. Aur woh individual nos. har ek TicketNum components ko pass ho jayenge. TicketNum component bhi bas individual no. ko print krwayega, and hence ye bhi apna presentational component rhega.

// Jab bhi kisi Component ko design krna hai, think about its 3 important parts: 
// 1. iske andar kya-kya cheezein props ke form mein aane wali hai. 
// 2. iske andar state variable kya-kya honge. 
// 3. iske andar events kya-kya honge.

// isse hamein ye pata chal jayega ki kaun-kaunse variables ko props mein aur state mein rakhna hai aur kaunse events ke liye hamein function define krne hai, for better clarity of working of our components.

// Ticket Component: smallest to largest component pr move krenge.
// 1. TicketNum (Presentational Component)
// Props: num
// State : none
// Events : none
// 2. Ticket (Presentational Component)
// Props : ticket[] of size n
// State : none
// Events : none

// Lottery Component:
// Lottery (Logical component)
// Props: n, winningSum (n -> App component batayega ki Lottery ticket ki kya size honi chahiye. winningSum -> App component batayega ki kaunsa aisa sum aana chahiye jo winning lottery consider kari jaye)
// State : ticket[]
// Events : buyTicket() (button jo baar-baar ticket ko regenerate krega)

// export default function Lottery ({n = 3, winningSum = 15}){ //default values 3 aur 15 assign kr di, incase agr App component se koi prop aaya hi nhi to.
// export default function Lottery ({n = 3, winCondition}){ //winCondition function as a prop. 
export default function Lottery ({ticketSize, winCondition}){ //for n size, passing ticketSize function as a prop. 
    // let [ticket, setTicket] = useState(genTicket(n))
    let [ticket, setTicket] = useState(genTicket(ticketSize()))
    // let isWinning = sum(ticket) === winningSum
    let isWinning = winCondition(ticket)

    let buyTicket = () =>{
        // setTicket(genTicket(n))
        setTicket(genTicket(ticketSize()))
    }

    return (
        <div>
            <h1>Lottery Game!</h1>
            <Ticket ticket={ticket} />
            {/* <button onClick={buyTicket}>Buy New Ticket</button> ab iska bhi component banega, waise not necessary for our small website, pr badi websites mein har button bhi ek component hi hota hai.  */}
            <Button action={buyTicket} /> {/*Button component ke action prop mein apan ne buyTicket function pass kr diya.*/}
            <h3>{isWinning && 'Congratulations, You won the Lottery!'}</h3>
        </div>
    )
}

// is tarah hamne Lifting State Up ko implement kara aur hierarchy bhi banai.

// Functions as Props: JS Functions are 1st Class Objects(yaani jo objects ke saath kaam hote hai wo kaam apan functions ke saath bhi kr sakte hai). This means they can be passed to a function as argument, returned from it & assigned to a variable(jaise object ko ham as an argument use kr sakte hai, unko return kar sakte hai from any function or method ya fir unko kisi naye variable ko tak assign kr sakte hai. Yhi sab apan yha functions ke saath bhi kr sakte hai.)
// In React, we can pass functions as props to child components. Generally, functions ko values ki tarah props mein pass krna har programming language mein possible nhi ho paata, which is available in our Js.

// From our Lottery Game example agr maan no kal ko apan decide karein ki isWinning mein sum na calculate ho, instead saare ticket ke nos. should be equal, tabhi wo winningTicket hoga. Ya winningSum ki value 10 ho. Ya only first no. should be equal to 0, tabhi winner hoga, etc. To aise mein in winning conditions ko apan Lottery component mein prop ki tarah pass kr sakte hai, as functions.

// Note: HTML CSS wagera mein jab bhi koi changes aati hai to usse pura DOM hi change ho jaata hai. Lekin apne React mein jis bhi portion mein change aata hai, keval utne part ki hi re-rendering hoti hai.