import {useEffect, useState} from "react";
import logoImage from "../../assets/company.png";
import "./Login.css";

type Props = {
    setIsLoggedIn: (log: boolean) => void;
    setCurrentPage: (page: string) => void;
};

const Login = (props: Props) => {
    
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string | null>();
    
    useEffect(() => {
        if(username && password){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[username, password])

    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
    
          if (response.ok) {
            props.setCurrentPage("Insurer")
            props.setIsLoggedIn(true)
          } else {
            setError("Wrong credentials.")
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={logoImage} alt="logo" className="logo" />
            </div>
            <div className="right-container">
                <h4>Enter your details to log in.</h4>
                <div className="form-container">
                    <form>
                        {error && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "25px" }}>{error}</p>}
                        <div className="input-container">
                            <input type="username" required={true} name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input type="password" required = {true} name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <button className="submit-btn" type="button" disabled={isDisabled} onClick={handleLogin}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;