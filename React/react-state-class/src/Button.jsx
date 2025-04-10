import "./Button.css"

export default function Button({action}){ //action prop lega.
    return(
        // <button style={{marginRight: "40px"}} onClick={action}>Buy New Ticket</button> //is case mein apan ne apna buyTicket function as an action isko assign kr diya hai. 
        <button className="Button" onClick={action}>Buy New Ticket</button> //is case mein apan ne apna buyTicket function as an action isko assign kr diya hai. 
    )
}