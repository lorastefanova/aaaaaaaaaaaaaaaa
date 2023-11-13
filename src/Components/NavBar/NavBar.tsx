import "./NavBar.css";

type Props = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
};

const NavBar = (props: Props) => {
    return (
        <div className="navigation-bar">
            <button onClick={() => props.setCurrentPage("Login")}>Login</button>
            <button onClick={() => props.setCurrentPage("Register")}>Register</button>
            <button onClick={() => props.setCurrentPage("Clients")}>Clients</button>
            <button onClick={() => props.setCurrentPage("Policies")}>Policies</button>
            <button onClick={() => props.setCurrentPage("Products")}>Products</button>
            <button onClick={() => props.setCurrentPage("Insurer")}>Insurer</button>
        </div>
    );
};

export default NavBar;