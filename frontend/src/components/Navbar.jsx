import { useState,useEffect } from "react";

import "../styles/Navbar.css";
/*
* Navbar component
* it has a link to the home page and a burger menu
* the menu has a link to the login page, a link to the new post page and a search filter, with an input and a select
*/

const  Navbar = ({onRouteChange, isLoggedIn,search, route}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [query,setQuery] = useState("");
    const [answeredSelector, setAnsweredSelector] = useState("all");
    const handleRoute = (event,route) => {
        event.preventDefault();
        setShowMenu(false);
        onRouteChange(route);
    }
    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(event.target.value.trim());
    }
    const handleFilter = (event) => {
        event.preventDefault();
        setAnsweredSelector(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        search(query,answeredSelector);
        setShowMenu(false);
    }
    
    const handleBlur = (event) => {
        event.preventDefault();
        setShowMenu(false);
    }
    
    useEffect(() => {
        search(query,answeredSelector);
    },[query,answeredSelector]);

    useEffect(() => {
        setQuery("");
    },[route]);
    
    return (
        <nav>
            <i className="fa fa-bars" onClick={()=>setShowMenu(!showMenu)}></i>
            {showMenu && (
                <>
                <div className="menu__background" onClick={()=>setShowMenu(!showMenu)}></div>
                <div className="menu">
                    
                    <i className="fa fa-times" onClick={()=>setShowMenu(!showMenu)}></i>
                    {!isLoggedIn && <a className="nav-link" href="" onClick={(e)=>handleRoute(e,"login")}>Iniciar sesión</a>}
                    <a href="" onClick={(e)=>handleRoute(e,"home")}>Blog</a>
                    <a className="nav-link" href="" onClick={(e)=>handleRoute(e,"new")}>Nueva pregunta</a>
                    {route === "home" && (
                    <form className="menu__search" onSubmit={handleSubmit} >
                        <i className="fa fa-search"></i>
                            <input  className="nav-link" type="text" placeholder="Buscar" value={query} onChange={handleSearch} />
                            <select  className="nav-link" name="filter" id="filter" onChange={handleFilter}>
                                <option value="all">Todas</option>
                                <option value="answered">Respondidas</option>
                                <option value="unanswered">Sin responder</option>
                            </select>
                        </form>
                    )}
                </div>
                </>
            )}
        </nav>
    )
}

export default Navbar;