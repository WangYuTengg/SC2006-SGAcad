import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

export default function Layout(){
    return (
        <div className=" flex flex-col min-h-screen">
            <NavBar />
            <Outlet />
        </div>
    )
}