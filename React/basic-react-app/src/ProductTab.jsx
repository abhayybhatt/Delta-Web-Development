import Product from "./Product.jsx"
function ProductTab(){
    // let options = ['hi-tech', 'latest technology', 'best quality'] //Passing Arrays to Props
    // let options = [<li>'hi-tech'</li>, <li>'latest technology'</li>, <li>'best quality'</li>] 
    // let options2 = {a: 'hi-tech', b: 'latest technology', c: 'best quality'} //Can also Pass Objects to Props 
    let styles = {
        //sabhi products ko same line mein display karane ke liye:
        display: 'flex',
        flexWrap: 'wrap',
        //inka parent element ke hisaab se alignment krne ke liye:
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
    <div style={styles}>
        <h2></h2>
        {/* <Product title='phone' price={40000}/>  passing props to the Product component. NOTE: string pass krna ho to koi dikkat nhi, lekin jab number pass krna hota hai to usko we need to wrap inside {}, nhi to error aata hai. Aur sirf number hi nhi, agr kisi aur format ka data bhi pass krna hota hai other than string to usko apan {} ke andar hi pass krte hai. features array ko pass kr diya. Wo bhi {} ke andar hi likhi hoti hai. */}
        {/* <Product title='laptop' price={80000}/> */}
        {/* <Product title='pen' price={1} /> price ki value nhi di to default value(1) pass ho jayegi. */}
        <Product title='Logitech MX Master' idx={0}/> {/*kaunsa index kaunse product ka hai, iske liye idx naam ka extra prop pass kr do jisse ki idea lag jaye.*/}
        <Product title='Apple Pencil (2nd Gen)' idx={1}/>
        <Product title='Zebronics Zeb-transformer' idx={2}/>
        <Product title='Petronics Toad 23' idx={3}/>
        </div>
    )
}

export default ProductTab
