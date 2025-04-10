// Activity: Show a Hello Message to the user in different colors. Pass 2 values as props : userName & textColor
export default function MsgBox({userName, textColor}){
    let styles = { color : textColor }
    return (
        <h3 style={styles}>Hello, {userName}</h3>
    )
}