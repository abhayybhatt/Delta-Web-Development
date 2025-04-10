import { StrictMode } from 'react' //import is same as require here.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //yha apne root element ko apan access kr rhe hai, aur us root element ke andar apan render kara rhe hai apne "App" component ko(via <App />). Aur ye App component kaha se aa rha hai? -> from App.jsx via line "'import App from './App.jsx'" in the beginning.
  // React mein jab StrictMode ka use hota hai to aise mein apne console mein cheezein 2 baar print hoti hai, agr apan React component ke andar apne props ko  console mein print krwa rhe ho toh:
  <StrictMode>  
    <App />
  </StrictMode>,
)
