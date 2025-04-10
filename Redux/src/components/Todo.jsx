import { useSelector } from "react-redux"; //ye redux toolkit se nhi aa rha, normal hamari react-redux wali library se aa rha hai. 
import AddForm from "./AddForm";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice";
import { markAsDone } from "../features/todo/todoSlice";

export default function Todo() {
    const todos = useSelector((state) => state.todos); //useSelector ke andar apni state aa jayegi, aur apan chah rhe hai ki wo state se state.todos ko return kr de, ab isko store kara denge todos naam ke variable mien.
    console.log(todos);
     const dispatch = useDispatch();

    const delHandler = (id) => {
        console.log("Delete", id);
        dispatch(deleteTodo(id)); //ab array se delete ho jayega. Array se delete matlab unordered list se bhi delete, aur apna component refresh ho jayega.
    }

    const markAsDoneHandler = (id) => {
        const todo = todos.find(t => t.id === id);
        if (todo && !todo.isDone) {
            dispatch(markAsDone(id));
        } else {
            console.log("Todo is already done");
        }
    }

    return (
        <>
        <AddForm />
        <h2>Todo List App</h2>
        <ul>
            {todos.map((todo) => (
                <li key={todo.id} style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
                    {todo.task} 
                    <button onClick={() => delHandler(todo.id)}>Delete</button> 
                    <button onClick={() => markAsDoneHandler(todo.id)}>Mark As Done</button>
                </li>

            ))}
        </ul>
        </>
    );
}
