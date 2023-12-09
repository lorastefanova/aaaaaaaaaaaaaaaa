import "./NavBar.css";
import {isDisabled} from "@testing-library/user-event/dist/utils";

type Props = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    isLoggedIn: boolean;
};

const NavBar = (props: Props) => {
    return (
        <div className="navigation-bar">
            {!props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Login")}>Login</button>)}
            {!props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Register")}>Register</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Clients")}>Clients</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Policies")}>Policies</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Products")}>Products</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Insurer")}>Insurer</button>)}
        </div>
    );
};

export default NavBar;