import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("member");

    const registerUser = async () => {

        try {

            const res = await axios.post(
                "https://dynamic-amazement-production-132f.up.railway.app/api/auth/signup",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            alert(res.data.message);

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div style={{ textAlign: "center", marginTop: "100px" }}>

            <h1>Signup Page 🚀</h1>

            <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

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

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >

                <option value="member">
                    Member
                </option>

                <option value="admin">
                    Admin
                </option>

            </select>

            <br /><br />

            <button onClick={registerUser}>
                Register
            </button>

        </div>

    );

}

export default Signup;
