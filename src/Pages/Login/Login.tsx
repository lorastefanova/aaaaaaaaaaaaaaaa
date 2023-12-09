import {useState} from "react";
import logoImage from "../../assets/company.png";
import "./Login.css";

type Props = {

};

const Login = (props: Props) => {
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={logoImage} alt="logo" className="logo" />
            </div>
            <div className="right-container">
                <h4>Enter your details to log in.</h4>
                <div className="form-container">
                    <form>
                        <div className="input-container">
                            <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <button className="submit-btn">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;