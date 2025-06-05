"use client";

import { use, useState } from "react";

export default function ClientComponent(){
    console.log("Rendering Client Component client Component");
    const [counter, setCounter] = useState();

    return(
        <fieldset>
            <legend>Client Component</legend>
            <p>Counter {counter}</p>
            <button onClick={() => setCounter(counter +1)}>Increment</button>
        </fieldset>
    )
    
}