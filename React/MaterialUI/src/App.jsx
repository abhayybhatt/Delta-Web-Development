// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Button from '@mui/material/Button' //ye button apne aap mein ek component hai from material UI.
// import DeleteIcon from '@mui/icons-material/Delete'
// import { Alert } from '@mui/material'
import WeatherApp from "./WeatherApp";

// <Button variant="contained" onClick={handleClick} startIcon={<DeleteIcon />}> Delete </Button> Material UI ka imported component hai.
      // <Button variant="contained" onClick={handleClick} disabled> Click me2! </Button>
      // <Button variant="contained" onClick={handleClick} color='error'> Click me2! </Button>
      // <Button variant="contained" onClick={handleClick} color='success' size='large'> Click me! </Button>
      // <Alert severity='error'>Delete option is given!</Alert>

function App() {
  // const [count, setCount] = useState(0)

  // let handleClick = () => {
  //   console.log('Button was clicked.')
  // }

  return (
    <>
      <WeatherApp />
    </>
  )
}

// Material UI: An open-source React component Library or a Library of React UI components. It implements Google's Material Design. Proper pre-built React components including their functionalities. 
// mui.com/material-ui/ : main page of material UI  library. We'll be using MUI Core, which is ready-to-use foundational React components, they are free. Baaki MUI X aur MUI Toolpad bhi hai, but we won't use them here.
// It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box. 
// Go to installation portion of Getting Started and run npm install command as provided in the docs in your vite project's directory.
// Material UI has 2 types of styling engines: Emotions and styled-components. As of late 2021, styled-components is not compatible with server-rendered Material UI projects. Isliye we'll be using Emotions styling engine.
// Material UI uses Roboto font by-default. use this command to add it: npm install @fontsource/roboto
// Once installed, they can be used like this:
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// It also provides pre-built font icon components or prebuilt SVG material icons: npm install @mui/icons-material
// For basic understanding, isko Bootstap of React keh sakte hai, with added funtionality of JavaScript.

export default App
