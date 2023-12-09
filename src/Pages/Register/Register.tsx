import {useState} from "react";
import "../Login/Login.css";
import logoImage from "../../assets/company.png";

type Props = {

};

const Register = (props: Props) => {
    const [email, setEmail] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const login = () => {

    }

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={logoImage} alt="logo" className="logo" />
            </div>
            <div className="right-container">
                <h4>Enter your details to create an account.</h4>
                <div className="form-container">
                    <form>
                        <div className="input-container">
                            <input required={true} type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input required={true} type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input required={true} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={login}>Register</button>
                        </div>
                    </form>
                </div>
                <div className="signup-forgot-password">
                    <button className="invis-btn">
                        Already have an account? Click here to log in.
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;