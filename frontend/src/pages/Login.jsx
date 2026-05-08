import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const res = await axios.post(
                "https://feisty-mindfulness-production.up.railway.app/api/auth/login",
                {
                    email,
                    password
                }
            );

            alert(res.data.message);

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                res.data.token
            );

            console.log(res.data.token);

            navigate("/dashboard");

        } catch (err) {

            alert("Login Failed");

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>Login Page 🔐</h1>

            <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={loginUser}>
                Login
            </button>

        </div>

    );

}

export default Login;
