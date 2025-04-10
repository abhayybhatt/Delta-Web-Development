import './App.css';
import Todo from './components/Todo';
import { Provider } from 'react-redux'; // Provider Component: The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. Yaani jitne bhi components App ke andar nested hai ham chah rhe hai ki wo sabhi apne store ko directly access kr paye, uske liye we'll use Provider component.
import { store } from './app/store';

function App() {

  return (
    <>
    <Provider store={store}> {/* jitne bhi components Provider ke andar rahenge nested, un sabhi ko store provide ho jayega. store ko as a prop pass kr diya, usko name bhi store de diya. Ab jo bhi components Provider ke andar hai, wo sabhi store ko directly access kr payenge. However, just using the Provider component is not enough - we'll need a React Hook named useSelector. */}
    {/* The useSelector hooks allow you to extract data or the state from the Redux store using a selector function. (returns the data back to us). To is useSelector Hook ko Todo component mein import karenge. */}
      <Todo />
    </Provider>
    </>
  );
}

export default App
