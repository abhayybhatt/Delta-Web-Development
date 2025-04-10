import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    // let [todos, setTodos] = useState(['sample task'])
    let [todos, setTodos] = useState([{task:'sample-task', id: uuidv4() , isDone: false}]) //creating an array of objects(for introducing uuid for each list task.)
    let [newTodo, setNewTodo] = useState('') //for creating our new task from input field as state variable.

    // 2 state variables hai hamare pass: newTodo and todos. jab hamara input element change hoga, tab newTodo trigger hoga aur uski value change hogi aur todos, jo ki apna array hai, uske andar saare tasks stored hai, use apan update krenge when the "Add Task" button is clicked.

    let addNewTask = ()=>{ //button functionality.
        // console.log('we have to add a new task in todo')
        // setTodos([...todos, newTodo]) //apni old todos  array ko destructure kara aur usmein apni newTodo ki value pass kr di. Ab isse apne tasks add hone lagenge Todo List mein!
        // setTodos([...todos, {task: newTodo, id: uuidv4()}]) //ab complete entire new object ko add krenge, kyuki uuid introduce hui.
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodo, id: uuidv4(), isDone: false}] //deleting from arrays ke liye, yha pr callback ko use krenge for performing the same operation.
        })
        setNewTodo('') // agr apan chahte hai ki naya task jo input mein type kara hai, usko Add Task button dabane ke baad wo placeholder empty ho jaye, to apan setNewTodo ko call krke uski value ko reset kr sakte hai by making it empty.
    }

    let updateTodoValue = (event) => { //target hamein batayega ki input element kya tha aur us input element se apan uski value access kr sakte hai.
        // console.log(event.target.value) //ab sirf jo bhi value apan enter kr rhe hai wo log ho jayegi console pr. Is value ko apan use krenge to update our newTodo:
        setNewTodo(event.target.value) //ab setNewTodo se component re-render hoga.

    }

    let deleteTodo = (id) => {
        // console.log('Task to be deleted')
        console.log(id) //ye id us element ki key hogi jise apanko delete krna hai.
        //ab delete krna hai element on the basis of its id. In React, we use filter method to filter out any element jo apan ko nhi chahiye apne array mein. Jaise jab arrays se hamein kuch render karana hota hai in the form of some list to we use map() method always. Similarly, deletion from array ke liye we'll always use filter method:
        // let copy = todos.filter((todo) => todo.id != id) //ye filter method hamesha ek array ki copy return krta hai usko copy varible mein store krenge. condition yha ye hai ki apan us array ki aisi copy bana rhe hai jaha pr todo ki id is NOT equal to that id jo ki delete krna hai. Ab is naye error ko directly apan pass kr sakte hai to our setTodos() method:
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id)) //ab items delete hone lagenge! How? -> hamare arrays se filter out ho gya, aur jaise hi setTodos method ko call kr diya, to hamara component re-render ho gya, jisse dobara map() method call hoga, sabhi tasks ko check kiya jayega, us array ke andar apna deleted task nhi dikhega, thus wo re-render nhi hoga. Aur yha callback(arrow function) apna add kiya hai kyuki purani value pr nayi value depend kr rhi hai.
        console.log(copy)
    }

    // Update all in array:
    let upperCaseAll = () => { //is method ka kaam ye hai ki ye hamare todos array ke saare objects pr jaaye aur sabhi tasks ko upperCase mein set kr de.
        // let newArr = todos.map((todo) => {
        //     // console.log(todo) //abhi har ek individual todo ko print krwa rhe hai console mein.
        //     return {
        //         ...todo, //ek copy bhej di, jaha har individual todo ko as-it-is return kiya, lekin:
        //         task: todo.task.toUpperCase() //agr har task mein change laana chahte hai, to apan todo.task ko upperCase mein convert kr denge. Ab jo newArr print hoga console mein it'll contain all tasks set in upperCase format.
        //     }
        // })
        // console.log(newArr)
        // Ab isko setTodos method mein bhej do: 
        setTodos((prevTodos) => (
                prevTodos.map((todo) => {
                return {
                    ...todo,
                    task: todo.task.toUpperCase()
                }
        }))) //ab upperCase All button pr click krne se all tasks will be set to uppercase!
    }

    //For Updating only one element in array: ismein bhi map function hi hoga, saath mein todo ki id check krenge jis id wale element mein change krna hai, uspr change apply kr denge same as above method. Baaki else mein sabhi jo elements hai jinki id match nhi hui unko return kr denge apan without change as-it-is.

    let upperCaseOne = (id) => {
        // console.log('one')
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if(todo.id == id){
                    return {
                        ...todo,
                        task: todo.task.toUpperCase()
                    }
                } else {
                    return todo
                }
    })))
    }

    //mark as done for a single task: 

    let markAsDone = (id) => {
        // console.log('one')
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if(todo.id == id){
                    return {
                        ...todo,
                        task: todo.task,
                        isDone: true,
                    }
                } else {
                    return todo
                }
    })))
    }

    let markAsDoneAll = () => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                return {
                    ...todo,
                    isDone: true,
                }
            })
        )) 
    }

    return(
        <div>
            <input placeholder="add a task" value={newTodo} onChange={updateTodoValue} /> {/* agr apne input element mein kuch bhi change hota hai to updateTodoValue function ko call kr denge. ab value={newTodo} krne se browser mein inspect krne se apne Components section mein bhi apan ko jo newTodo wali state hai usmein jo apan ne input kiya hai wo add hota hua dikhega, yaani jab apan input element mein change kr rhe hai to wo change apan ko state variable newTodo mein bhi dikhai dega. Hence final state variable ki value jo apan ne enter kari hai wo newTodo mein store ho jayegi.*/}
             <br />
            <button onClick={addNewTask}>Add Task</button>
            <br /><br /><br />
            <hr />
            <h4>Todo List</h4>
            <ul>
                {
                    todos.map((todo) => ( //agr kisi array ko render karana hota hai based on each individual item, we use map() method.
                        // <li>{todo}</li> //dynamically adding numerous list items. 
                        <li key={todo.id}>
                            <span className={todo.isDone ? 'line-through' : ''}> {todo.task} </span> {/*yha pr is span element ko className de denge agr todo ki isDone property true hogi to, jo ki Mark as Done button pr click krne se ho rhi hai. Agr true hogi to line-through naam ka className isko mil jayega, jismein apan ne line-through text decoration property  mein de diya hai App.css mein.*/}
                            &nbsp;&nbsp;&nbsp;
                            {/* <button onClick={deleteTodo(todo.id)}>delete</button> to aisa krne se todo.id apan ne as a parameter deleteTodo ko pass to kr di hai, pr aisa krne se apna function automatically execute ho jayega, thus onClick krne se kuch nhi hoga. */}
                            <button onClick={() => deleteTodo(todo.id)}>delete</button> {/*to we'll be creating an arrow function, aisa krne se wo function execute nhi hoga automatically aur uski copy create ho jayegi bas, with some argument. */}
                            <button onClick={() => upperCaseOne(todo.id)}> UpperCase one</button>
                            <button onClick={() => markAsDone(todo.id)}> Mark as Done</button>
                        </li> //kyuki ab array nhi, todo ek object ban chuka hai. Aur us todo ki key assign kr denge for each list item using li key = {todo.id}. Ab todo ki id hamari key ban jayegi aur unique key prop waali console error ab show nhi hogi.
                    )) //agr curly braces {} use krte to ye li item return karana padta.
                }
            </ul>
            <br />
            <button onClick={upperCaseAll}>UpperCase All</button>
            <button onClick={markAsDoneAll}>Mark as Done All Tasks</button>
        </div>
    )
}

// Fixing 'each child in a list should have a unique key props console window error : jab bhi dynamically apan is tarah se bahut saare elements ko add krte hai, to Aise mein har ek individual item ko track krne ke liye har ek element ke pass ek "key" attribute hona chahiye, which serves as a unique identifier for each list item. Why? -> agr bahut saare identical items honge list ke andar aur kisi ek item ko unmein se delete krna hoga, to bina unki unique keys ke dikkat hogi uski identification mein. Isliye we use keys for each individual list item. To fix kaise kre? -> apna npm ka uuid package lagakr, jo har list item ko ek unique id assign kr dega. Ab har ek todo jisko apan ne add kiya it should have 2 values: pehla task jise add kiya aur dusri uski unique id(key)