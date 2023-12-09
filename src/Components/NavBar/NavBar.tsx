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
            {!props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Login")}>Логин</button>)}
            {!props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Register")}>Регистрация</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Clients")}>Клиенти</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Policies")}>Полици</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Products")}>Продукт</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Insurer")}>Застраховател</button>)}
            {props.isLoggedIn && (<button onClick={() => props.setCurrentPage("Objects")}>Застраховани обекти</button>)}
        </div>
    );
};

export default NavBar;