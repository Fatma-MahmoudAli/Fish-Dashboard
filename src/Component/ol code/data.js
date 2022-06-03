import React  , {useEffect , useState} from 'react';
import  Features from "./map.json" ;

function Data (){
    // const [data , setData] = useState({})

    // useEffect(() => {
    //     axios.get()
    // })
    return (
        <div>
            {
            Features && Features.map( Feature => {
                return (
                    console.log(Feature)
                    // <div>
                    //     <ul>
                    //         <li>
                    //             {Features}
                    //         </li>
                    //     </ul>
                    // </div>
                )
            })}
        </div>
    )
}

export default Data