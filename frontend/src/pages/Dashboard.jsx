import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const payload = JSON.parse(
        atob(token.split(".")[1])
    );

    const role = payload.role;

    const [title, setTitle] = useState("");
    const [projectName, setProjectName] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [deadline, setDeadline] = useState("");

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const res = await axios.get(
                "https://dynamic-amazement-production-132f.up.railway.app/api/tasks"
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addTask = async () => {

        if (
            title === "" ||
            projectName === "" ||
            assignedTo === "" ||
            deadline === ""
        ) {

            alert("Please fill all fields");

            return;

        }

        try {

            await axios.post(
                "https://dynamic-amazement-production-132f.up.railway.app/api/tasks/create",
                {
                    title,
                    projectName,
                    assignedTo,
                    deadline
                }
            );

            fetchTasks();

            setTitle("");
            setProjectName("");
            setAssignedTo("");
            setDeadline("");

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTask = async (id) => {

        try {

            await axios.delete(
                `https://dynamic-amazement-production-132f.up.railway.app/api/tasks/delete/${id}`
            );

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>Dashboard 🚀</h1>

            <h3>
                Role: {role}
            </h3>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
            />

            <br /><br />

            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />

            <br /><br />

            {
                role === "admin" && (

                    <button onClick={addTask}>
                        Create Task
                    </button>

                )
            }

            <br /><br />

            <button onClick={() => navigate("/login")}>
                Logout
            </button>

            <hr />

            <h2>Tasks</h2>

            {tasks.map((item) => (

                <div
                    key={item._id}
                    style={{
                        border: "1px solid white",
                        padding: "15px",
                        marginBottom: "15px"
                    }}
                >

                    <h3>{item.title}</h3>

                    <p>
                        Project: {item.projectName}
                    </p>

                    <p>
                        Assigned To: {item.assignedTo}
                    </p>

                    <p>Status:</p>

                    <select
                        value={item.status}
                        onChange={async (e) => {

                            try {

                                await axios.put(
                                    `https://dynamic-amazement-production-132f.up.railway.app/api/tasks/update/${item._id}`,
                                    {
                                        status: e.target.value
                                    }
                                );

                                fetchTasks();

                            } catch (error) {

                                console.log(error);

                            }

                        }}
                    >

                        <option>Pending</option>

                        <option>In Progress</option>

                        <option>Completed</option>

                    </select>

                    <p>
                        Deadline: {item.deadline}
                    </p>

                    {
                        new Date(item.deadline) < new Date() && (

                            <p style={{ color: "red" }}>
                                OVERDUE
                            </p>

                        )
                    }

                    {
                        role === "admin" && (

                            <button
                                onClick={() => deleteTask(item._id)}
                            >
                                Delete
                            </button>

                        )
                    }

                </div>

            ))}

        </div>

    );

}

export default Dashboard;
