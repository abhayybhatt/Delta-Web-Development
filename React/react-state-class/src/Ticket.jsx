import TicketNum from "./TicketNum";
import './Ticket.css'

export default function Ticket({ticket}){ //ticket array ka prop aayega from Lottery component.
    return (
        <div className="Ticket">
            <p>Ticket</p>
            {/* <TicketNum num = {ticket[0]} /> individual ticket num ko generate krenge jismein TicketNum ke num prop mein apan pass kr rhe hai first element of our ticket array. But again, ye to hard coding ho gyi. Isliye we'll be using map function: */}
            {/*jitna bhi ticket array ka size hoga utni baar map method se TicketNum generate ho jayega: */}
            {ticket.map((num, idx) => ( 
                <TicketNum num={num} key={idx}/> 
            ))} {/*now all of our TicketNum will have individual key(idx) which can be used to access specific nos. */}
        </div>
    )

}