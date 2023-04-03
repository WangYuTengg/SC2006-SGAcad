import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

/**
 * Layout Component.
 *
 * Used to apply a standard layout to all pages of the application
 * @component 
 */
export default function Layout(){
    return (
        <div className=" flex flex-col min-h-screen">
            <NavBar />
            <Outlet />
        </div>
    )
}