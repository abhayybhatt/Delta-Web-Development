function handleFormSubmit(event){
    event.preventDefault() //preventDefault() method ka use kiya hai taaki form submit hone se pehle page refresh na ho. Ab aisa krne se form submit hone ke baad bhi page refresh nhi hoga, aur 'Form Submitted!' print hone ke baad persist krega console window mein.
    console.log('Form Submitted!')
}

export default function Form(){
    return(
        <form onSubmit={handleFormSubmit}> {/*onSubmit attribute ka use kiya hai taaki form submit hone se pehle handleFormSubmit() function execute ho.*/}
            <input placeholder="type something" />
            <button>Submit</button>
        </form>
    )
}
