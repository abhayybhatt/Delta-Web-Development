// Comments aise likhte hai .jsx files mein! 
// React: JS Library for creating UI(jo bhi frontend mein apan webpage mein view krte hai, jaise ki cards, navbar, buttons, etc.). A very popular library created by facebook(now Meta) and is still maintained by facebook.
// react.dev website
//It Creates user interfaces from 'components'.
// React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps. 
// agr 2 similar button apne ui mein dikhane hai to ek baar hi apan ko component create krna hoga us button ka and we can then reuse it. Best approach to understand what components are is to compare them with our functions. Functions bhi ek reusable piece of code hote hai jinko ek baar define krte hai aur kitne baar bhi use kr sakte hai by invoking(calling) our function. Similarly, apan kisi bhi cheez ka component bana sakte hai aur us component ko agr apne UI mein dikhana hai to kitne bhi baar uska apan use kr sakte hai by 'rendering'(yaani kisi cheez ko display kara dena) that component. Rendering in React is same as invoking(calling) in a function. Component is a reusable piece of individual code, jise kitni bhi baar apne UI mein display karane ke liye render kara sakte hai. In react, almost everything is a component only.
//Ye sabhi components ek hierarchy form krte hai - kuch components ke andar dusre components hote hai. Chhote chhote components ek bade component ke andar aa sakte hai. Aur in sub-components ko agr kahi aur bhi page mein use krna ho to we can individually use that sub-component.
// React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.
// Component ek aisa piece of code hai, jiske pass html ke saath logic(Js) bhi likhi hui hoti hai, aur appearance ke liye css bhi hai. Ye teeno cheezein apan component ke saath associate kr sakte hai. Ab Har component ka alag HTML, CSS aur JS hai!
//React code is written in a special syntax known as JSX(JavaScript Extension Syntax). It lets us write HTML directly inside JS. JSX is a way of writing HTML inside JS code. To sabhi UI components ko apan jsx mein use krte hai apne logic aur structure ko add krke. Har component mein apan apne html structure ko add krke apne UI components ko create krte hai.
//NOTE: JSX is not real Js. un dono ka syntax kaafi different hai. Hota yeh hai ki jsx ke code ko internally transpile kiya jaata hai into pure Js code using a special tool known as 'Babel'. To jsx ka code pehle internally convert hota hai into Js code using Babel aur wo converted code use hota hai to display things on our webpage. Automatic process. 
//babeljs.io website
// React Set up for Local Environment: Jaise boilerplate code hota hai aise hi React mein boilerplate folders and files hoti hai jinke bina React apne project pr kaam nhi krega.
// Create-React-App V/S Vite: these 2 tools are used for local Environment set up. Create-React-App tool purana hai aur Vite recently aaya hai(2020 mein), which is quicker and faster as compared to Create-React-App
// vitejs.dev website hai
// For more information about why Vite is better, we can check this blog post: https://semaphoreci.com/blog/vite
// Vite is comparatively faster, naam mein hi answer hai, 'vite' in French means Quick.
// For using vite: we'll have to create a project:
// npm create vite@latest -> npm ki help se install hoga, @latest matlab latest version hamesha. Vite works with a lot of frameworks like: Vanilla, Vue, React, Preact, Lit, Svelte, Solid, Qwik and many more.
//npm install to install node_modules from package.json
//ab jo files add hui hai wo apne liye boilerplate ka kaam krti hai. Inhi ko edit krke we'll create our React project.
// npm run dev //to start the server

//src ya source folder ke andar major logic likha hua rehta hai. App.jsx mein App is a parent component jo har react app mein milta hai. Yaani root component App(present in App.jsx file) hai jiske andar baaki sabhi components aa rhe hote hai. To component mein jo HTML aur JS rehta hai usko combine krke jsx bana diya aur usi component ki css apan likhte hai in its same_component_name.css file. To App.css aur App.jsx dono files ek single App component ko create krne ke kaam aa rhi hai.
// index.html is the main page of our code.

//sabhi cheezein jo ki apne webpage pr create ho rhi hai, App.jsx mein App component ke andar hi create ho rhi hai.
//Basic Flow to understand what's going on:
//1. Hamari index.html file hai, jo hamare page pr render hoti hai.
//2. is file ke pass ek root component hota hai + ye file(index.html) hamare main.jsx file ko treat krti hai as a script.
//3. Aur main.jsx kehta hai ki us root ke andar App component ko render kara do.
//4. Aur ye App hamare App.jsx se aaya hua ek component hota hai.
//5. main.jsx, App.jsx se component leta hai aur wo root ke andar apne App component ko add kr deta hai, jo finally apne index.html ke andar apan ko dikhai dene lag jaata hai.

// To React mein pura main kaam ye 3 files: index.html, main.jsx aur App.jsx karati hai.
//Jo pura component return hua hai App.jsx se, uski puri styling is written in App.css. 
//Similarly, index.html ki styling is written in index.css file.
//index.html and main.jsx files will be generally left untouched, all changes will be done in App.jsx file if we want to implement any change in the web page. Ya fir individual components banane hai to unke naam pr hi naye .jsx files banenge jinmein required changes will be implemented.

// Writing Markup in JSX: (Basic rules to follow while writing in .jsx files):
// 1. Return a single root element: yaani hamesha ek hi element return krte hai components ko. Agr multiple elements ko return krna ho to wrap them in a <div> tag.
// 2. Close all the tags: saare tags closed tags hone chahiye jo ki components return krenge. agr koi empty HTML tag hai jaise ki <img> ya <br>, to unko bhi yha pr close krna padta hai! -> <img></img>, <br /> . But, why? -> kyuki jab bhi Babel jsx ko js mein convert krta hai, to internally it looks for closing tags. Isliye closing tag is necessary jisse ki Babel properly conversion kr paye.
// 3. camelCase most of the things (not 'all'): Maximum cheezein camelCase mein likhi hoti hai, pr hamara component ka naam (and during its function definition bhi) Capital Letter se start hona chahiye. Isse HTML ke kuch attributes mein ke changes bhi pata lagte hai, jaise ki apan <div id='mainbox'> likh sakte hai pr apan <div class='mainbox'> nhi likh payenge. Why? -> kyuki Js mein bhi class ek keyword hota hai(jab classes define kri jaati hai Js mein to we use class keyword), to since class is a reserved word in Js, hence jo bhi Js keywords hote hai, unko apan as HTML attributes yha pr use nhi kr paate. Aise mein we use their alternate names. Jaise ki class attribute ke liye we use className here, to define a class for any component in React.

// JSX with Curly Braces: jsx mein jaha bhi {} aa jaate hai, unke andar ka jo bhi pura code likha hota hai, it is treated as pure Js code. Usmein hamein fir Jsx ke hisaab se code likhne ki need nhi rehti apan pure Js code likh paate hai. JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.

// Styling Components: it is possible to style differenct .jsx component files with a single style.css files. But genrally, React mein is tarah se apan styling nhi likhte. Styling ko aise mein likhne ke liye apan component-wise styling ko divide kr dete hai, jaise App component ke liye App.css, Product component ke liye Product.css and so on. Har component ka uska ek .css file rakhna hai. Aur css file ko wahi naam dena hai jo apne component ka hai. Component file, function and its .css file all should be given same name. Alag bhi de sakte hai, lekin same naam rakhne se help milti hai in identifying ki kaunse component ki styling kis file ke andar likhi hui hai.

// Install React Developer Tools: An extension of chrome that helps us as a developer if we are coding with React.
// https://react.dev/learn/react-developer-tools site, isse extension download karo. Console pr 2 new options - Components and Profiler aa jayenge. Achha hai debugging and inspecting ke liye. Atlassian is a website made using React.

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import Title from './Title.jsx' //agr Title component ko yha use krna hai to import krna padega na! Generally, name apan same rakhte hai us file ka jisse import kr rhe hai Component. Agr sirf aage Title component mein hi change krna hoga, to we can directly make changes in Title.jsx file without needing to worry about manipulating other components, isliye bhi apan separate files banate hai for each component.
// import {Title} from './Title.jsx' //For named exports, curly braces use krna padta hai.
// import Product from './Product.jsx'
import ProductTab from './ProductTab.jsx'
// import MsgBox from './MsgBox.jsx'
import Button from './Button.jsx'
import Form from './Form.jsx'

function Description(){
  return(
    <h3> I am the Description!</h3>
  )
}

// Rendering a Component: To render a component, we write them in the form of HTML tags. They can be rendered in 2 ways: 
{/* <Title></Title> or <Title /> -> Both ways are correct. */}

function App() { //Jo baar baar App component keh rhe hai, wo isi ko keh rhe hai. Ye function hi hamara App component hai. Ye App component jo bhi return krega, wo hamara User Interface(UI) ban jayega.
  // const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    // <button>Hello World!</button>

    // React Fragment: Fragments let you group a list of children without adding extra nodes to the DOM. Agr ham different HTML elements ko <div> mein group krke bhi likh rhe hai, tab bhi ek additional node to create hogi hi <div> ki apne Document Object Model (DOM) mein. Agr apan nhi chahte hi additional node create ho, for that we use React Fragment. 
    //React Fragment use krna yaani simply jo <div> </div> ki lines thi, replace them with <> and </> respectively. Ek empty opening tag aur dusra empty closing tag. Inka use yhi hai ki they combine multiple elements or children into a single entity or parent element. Isse extra node create nhi hoga.

    // <div> {/* for diplaying multiple elements */}
    <>
    {/* <MsgBox userName='Abhay' textColor='silver'/>
    <MsgBox userName='aditya' textColor='maroon'/>
    <MsgBox userName='aryan' textColor='gold'/> */}
    <h2>Blockbuster Deals | Shop Now!</h2>
    <ProductTab />
    <Button/>
    <Form/>

    </>
      // <Title /> App component ke andar hamara Title component render ho rha hai. 
      // <Description /> 
      // <Title /> 
      // <Description /> 
      // <Product/>
      //<Product/>
      //<Product/> Ab generally aise 3 combined products display karane ke liye ham unko is tarah likh sakte hai, koi dkkat nhi. Pr isko aur better way mein likhne ke liye apan in teeno products ko alag se ek component ke andar put kr sakte hai. That's how conventionally we write in React. Ab in teeno products ko apan kisi ek bade ProductTab component ke andar combine krte hai. 
    // </> //React fragment. Ab additional <div> ka node create nhi hoga. 
  )
}

export default App //yha se is App component ko export kiya jaa rha hai. Ye saari cheezein export hokr main.jsx mein import ki gyi hai.


