import { useState } from "react";
// Dispatching Action: Triggering a State Change
// Ham chah rhe hai ki naya task jo apan form ke through add kr rhe hai wo apne todos wale state variable array mein store ho jaye. Jab bhi apan state change krne ke liye koisa action create krte hai, usko kehte hai Dispatching an action. 
// Redux mein action ko dispatch krne ke liye we use useDispatch React Hook. 
// The useDispatch hook allows you to send or dispatch an action to the redux store by giving the action as an argument to the dispatch variable.
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddForm(){
    const [task, setTask] = useState('');
    const dispatch = useDispatch();//jab bhi ham dispatch yaani kisi bhi state change ko trigger krne ke liye 2 cheezein honi chahiye apne pass: 1. Kaunsa reducer function call hoga aur 2. Kaunse action pe wo reducer function call ho rha hai.

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(task);
        dispatch(addTodo(task));//reducer ke andar hi ek state pass hoti hai dusra action pass hota hai. Ab yha pr state pass krne ki need nhi kyuki addTodo ko already pata hai ki state kya hai, hamein isko wo data bhejna hai jo ki action ke payload mein jaakr save ho jayega. Action ke payload mein kya rhega? -> apne task ka data. Ab ye krne se addTodo ki functionality trigger ho jayegi aur aisa hone se hamari state ke andar add ho jayega newTodo. To dispatch yaani apan ne wo state change trigger kara diya apan ne.
        setTask('');
    };

    return(
        <>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={(event) => setTask(event.target.value)} />
            <button>Add Task</button>
        </form>
        </>
    )
}