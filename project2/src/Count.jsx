import { userState } from "react";

function Count() {
    const[count,setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div>
            <h1>Count is {count}</h1>
            <button onClick={handleClick}>click me</button>
        </div>
    );

}
export default Count;