import React, {useEffect, useState} from "react";
import "../Login/Login.css";
import logoImage from "../../assets/company.png";

type Props = {
    setIsLoggedIn: (log: boolean) => void;
    setCurrentPage: (page: string) => void;
};

const Register = (props: Props) => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if(email && username && password){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[email, username, password])

    useEffect(() => {
        if(success){
            props.setIsLoggedIn(true)
            props.setCurrentPage("Insurer")
        }
    },[success])

    const register = async () => {
        const user = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                setError("Username or email already exists.")
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);

        setError(null);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        setError(null);
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={logoImage} alt="logo" className="logo" />
            </div>
            <div className="right-container">
                <h4>Enter your details to create an account.</h4>
                <div className="form-container">
                    <form>
                        {error && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "25px" }}>{error}</p>}
                        <div className="input-container">
                            <input type="email" name="email" placeholder="Email" onChange={handleEmailChange}/>
                        </div>
                        <div className="input-container">
                            <input type="text" name="username" placeholder="Username" onChange={handleUsernameChange}/>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={register} disabled={isDisabled}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;