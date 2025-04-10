export default function Price({oldPrice, newPrice}){
    let oldStyles = {
        textDecorationLine: 'line-through', //old price ko strike-through krne ke liye.
    }
    let newStyles = {
        fontWeight: 'bold',
    }
    let styles = {
        backgroundColor: '#e0c367',
        height: '30px',
        width: '250px',
        borderBottomLeftRadius: '14px',
        borderBottomRightRadius: '14px',
    }
    return(
        <div style={styles}>
            <span style={oldStyles}>${oldPrice}</span> {/*span mein likha so that ye dono same line mein aa jaye.*/}
            &nbsp;&nbsp;&nbsp;
            <span style={newStyles}>${newPrice}</span>
        </div>
    )
}