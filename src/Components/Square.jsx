export default function Square(props) {
    return (
        <button className={props.lightMode ? "square" : "square-dark"} onClick={props.onClick}>
            {props.value}
        </button>
    )
}