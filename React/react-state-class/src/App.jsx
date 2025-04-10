import './App.css'
import CommentsForm from './CommentsForm';
import Form from './Form';
import Joker from './Joker';
import Lottery from './Lottery'
import NewCounter from './NewCounter';
// import TicketNum from './TicketNum'
// import Ticket from './Ticket'
// import LudoBoard from './LudoBoard'
// import TodoList from './TodoList'
// import Counter from './Counter'
// import LikeButton from './LikeButton'
import { sum } from './helper'

function App() {
  // const [count, setCount] = useState(0)

  //Functions as Props part:
  // let winCondition = (ticket) => { //ab agr winning condition change krni hai to bas is function mein changes krte jao!
  //   // return sum(ticket) === 15 //yaani koisi ticket array as parameter le rha hai aur boolean value return kr dega based on our provided condition. 
  //   // return ticket[0] === 0 //agr ticket ka pehla no. 0 aaya to true return hoga.
  //   // return ticket.every((num) => num === ticket[0]) //ye kya hai? -> array ka every method use kara hai. Ismein apan ne parameter num ko de diya. Condition ye hai ki har jo ticket ke andar no. hai, hamare ticket array ke first element ke equal hoga, yaani first no. apne ticket array ke equal hona chahiye baaki sabhi numbers ko bhi, tabhi true return hoga.
  //   if(ticket.length == 1){
  //     return ticket[0] == 0; //agr single digit ticket no. generate hua to it should be 0 to win the lottery, else apni upar ki condition ko follow kara lo.
  //   } else {
  //     return ticket.every((num) => num == ticket[0]);
  //   }
  // }

  // let ticketSize = () => {
  //   return (Math.floor(Math.random() * 5) + 1)
  // }

  return (
    <>
      {/* < LudoBoard /> */}
      {/* <p>States in React</p>
      <Counter />
      <LikeButton /> */}
      {/* <TodoList /> */}
      {/* <Lottery /> */}
      {/* <TicketNum num={5} />
      <TicketNum num={4} />
      <TicketNum num={3} /> */}
      {/* <Ticket ticket={[0,1,2]}/>
      <Ticket ticket={[5,2,3,2,4]}/> */}
      {/* <Lottery n={3} winningSum={15}/> */}
      {/* <Lottery n={3} winCondition={winCondition} /> */}
      {/* <Lottery ticketSize={ticketSize} winCondition={winCondition} /> */}
      {/* <Form /> */}
      {/* <CommentsForm />  */}
      {/* <NewCounter /> */}
      <Joker />
    </>
  )
}

// State in React: The state is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders. Isko samajhne ke liye apan counter banayenge, similar to default counter present in Vite + React template.

export default App
