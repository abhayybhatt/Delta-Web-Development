// Our 1st Component:A reusable & independent piece of code.
function Title(){ //har component ko as a function hi likha jaata hai for their definition. Note that function names always start with a Capital Letter.
    let name = 'Abhay';
    return( //returned value koi bhi html element ho sakta hai jaise h2, h3, img, p, button, etc. BUT, we can only return one single html element. Do elements ko ek saath return krna is not possible. Although, agr multiple cheezein return krni hai to unko ek <div> ke andar apan embed krke div ko return kr sakte hai. Pr ek time pr apan  kisi ek hi root element ko return krte hai kisi component se. NOTE: Convention says that har component apni alag .jsx file mein hona chahiye, chaahe wo element kitna bhi chhota ya bada kyu na ho.
      <>
      <h1> I am the Title!</h1>
      <p>2 * 2 = {2 * 2}</p> {/* is calculation ko krne ke liye Js ka logic lagega, isliye rhs ki expression ko apan Js code ke form mein treat krna chahte hai, for that, we included the Js code in {} */}
      <p>Hi, {name.toUpperCase()}</p> {/*these curly braces allow us to write pure Js code into our Jsx files. */}
      </>
    )
  }

//Isko export krna padega so that it can be used in App.jsx
// Default Export: 
export default Title //Ise generally tab use krte hai jab hamare pass single value hoti hai jisko export krna hota hai, aur usi file ka apan koi custom name use krna chahte ho to. Single value export kr rhe hai jiska naam Title hai.

//Named Export: Ise generally tab use krte hai jab multiple cheezon ko apan export kr rhe ho.
// export {Title}

// In summary, named exports are useful when you want to export multiple values and import them with their specific names, while default exports are handy for exporting a single value and giving it a custom name when importing. The choice between the two depends on the structure and requirements of your codebase.