import { Suspense } from "react";
import ServerComponent from "./ServerComponent"
import ClientComponent from "./ClientComponent"


export default function App(){
    console.log("Rendering App Server Component");
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <h1>Notes App</h1>
            <ServerComponent />
            <ClientComponent />
        </Suspense>
    )
    
}