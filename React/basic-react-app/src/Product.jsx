import './Product.css'
import Price from './Price'

// Structuring Components
// Kisi bhi website ke section ko dekho, aur usko components ke form mein break krte chale jao. Fir sabse chhote andar ke components banakr pura webpage design krna start karo. 
// function Product(){
//     return (
//         <div className="Product"> {/*generally, jo root element ko apan className dete hai, it should be same as the name of that component, by convention. */} 
//             <h3>Product Title</h3>
//             <h5>Product Description</h5>
//         </div>
//     )
// }

// React Props: Props are the information that you pass to a JSX tag. If we want to send some specific information along with our components, they are used. Aur us specific information ko hi React props kehte hai. It is very similar to the parameters that we pass to a function. Props are passed to components in the same way that attributes are passed to HTML elements. <ComponentName propName="propValue" />. Props are immutable, yaani unko change nhi kiya ja sakta. Is tarah se wo propName  ki value propValue as an argument apne component ke function mein pass ki jaati hai. Yaani basically jo function ke andar function call mein hamare parameters hote hai, wahi component mein, jab component render hota hai, to hamare props ban jaate hai.

// function Product(props)// pr ham aise props ko directly parameter mein nhi daalte kyuki wo object hote hai, instead ham unki destructuring kr lete hai. 
// function Product ({title, price = 1, features}){ // destructuring of props. Jo bhi keys ham expect kr rhe hai, unko pehle hi yha likh denge inside curly braces. Also, we have provided a default value to price, yaani agr kuch bhi value na aaye to bydefault uski value 1 rakh do, similar to assigning default values to parameters during their definition.
// function Product ({title, price}){
    // console.log(features)
    // const list = features.map((feature) => <li>{feature}</li>) //Passing Array of HTML elements to props, map function ki help se. Ab har jo feature ki value hai, wo replace ho jayegi <li> feature </li> se.

    // if(price>30000){ //basic method if-else conditionals, but leads to bulky and repetitive code.
    //     return (
    //         <div className="Product">
    //             <h3>{title}</h3>
    //             <h5>Price: {price}</h5>
    //             <p>Discount of 5%</p>
    //         </div>
    //     )
    // } else{
    //     return (
    //         <div className="Product">
    //             <h3>{title}</h3>
    //             <h5>Price: {price}</h5>
    //         </div>
    //     )
    // }

    // let isDiscount = price>30000 ? 'Discount of 5%' : '' //ternary operator, isDiscount variable mein 5% store hoga agr price>30000 hai, nhi to kuch nhi.

    {/* Dynamic Component Styling: isko conditional component styling bhi kehte hai. Based on some condition, we can change the styling of our component. */}
    // let styles = { backgroundColor : 'blue' } //Note: css mein isko background-color likhte hai, pr jsx mein use camelCase mein likhna hota hai. Hyphen nhi aayega, saari cheezein camelCase mein convert ho jayengi. Lekin yha pr ek dikkat hai - saare divs ko same styling milegi aur koi condition nhi hai for any specific div. Isliye, we can use ternary operator to change the styling based on some condition.
    // let isDiscount = price > 30000
    // let styles = { backgroundColor : isDiscount ? 'blue' : null }
function Product ({title, idx}){
    let oldPrice = ['12,495', '21,999', '1,599', '599']
    let newPrice = ['8,999', '13,999', '899', '348']
    let description = [
        ['8,000 DPI', '5 Programmable Buttons'], ['Desinged for Ipad Pro', 'intuitive design'], ['intuitive design', 'Designed for Ipad Pro'], ['wireless mouse','optical orientation']
    ] //Haan bhai 2D array hai!
    return (
        // Activity: Amazon Product Listing cards 
        <div className="Product">
            <h4>{title}</h4>
            <p>{description[idx][0]}</p>
            <p>{description[idx][1]}</p>
            <Price oldPrice={oldPrice[idx]} newPrice={newPrice[idx]}/>
        </div>
    )
        // <div className="Product" style={styles}> {/*inline styling, ismein apan ek object pass krte hai, jismein saari css properties key-value pairs ke form mein hoti hai. */}
        //     <h3>{title}</h3>
        //     <h5>Price: {price}</h5>
            {/* <p>{features}</p> */}
            {/* <p>{features.map((feature) => (<li>{feature}</li>))}</p> */}
            {/* <p>{features}</p> Jab jsx ke andar koi bhi component render karaya jaata hai, to agr us prop ke andar koi bhi object ya array hota hai, to uske individual item ko extract karaya jaata hai aur fir usko print kiya jaata hai, isliye unlike html and js yha pr comma=separatd values mein wo individual items print nhi hote hai.*/}
            {/* <p>{features2}</p> features2 object ko print krne ke liye, uske keys ko individually print krna hoga, aise directly pure object ko render nhi payenge. */}
            {/* <p>{features2.a}</p> */}
            {/* Conditionals: Adding elements on the basis of some condition */}

            {/* <p>{price>30000 ? 'Discount of 5%' : ''}</p> Bdhiya hai, pr dikkat yeh aati hai ki jin Products pr discount nhi hoga to waha unmein empty <p> tag ban jayega DOM ke andar, hence ek extra empty node to create ho hi rhi hai.  */}
            {/*aise best yeh hai ki <p> tag hi hata do. Bas condition check hogi*/}
            {/* {price>30000 ? <p>'Discount of 5%'</p> : null} agar price>30000 hai to hi <p> tag render hoga, nhi to null value jayegi. Ab extra node nhi hoga. Isi part ko likhne ka ek dusra tarika hai: */}
            // {isDiscount && <p>Discount of 5%</p>} {/*? ki jagah && laga do aur null condition ko hata do. && ke case mein agr condition 1 true ho jaati hai to hi condition 2 check kri jaati hai.*/}
        // </div>
}
export default Product

// React ke andar there is something called Webpack, jiski help se import aur export functionality ho paati hai. Webpack hamein ye bhi addtional functionality deta hai ki ham jsx files mein css files ko bhi import kara sakte hai.
// import 'directory of the css file'
