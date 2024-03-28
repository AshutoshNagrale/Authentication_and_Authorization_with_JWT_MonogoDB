import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const registerFormRef = useRef(null);
  const [serverHealth, setServerHealth] = useState(false);
  const [loginData, setLoginData] = useState();
  const [sessionData, setSessionData] = useState();
  const [logoutData, setLogoutData] = useState();
  const [registerData, setRegisterData] = useState();

  useEffect(() => {
    const checkServerHealth = async () => {
      await axios
        .get("http://localhost:4000/api/health")
        .then(() => {
          setServerHealth(true);
        })
        .catch(() => {
          setServerHealth(false);
        });
    };
    checkServerHealth();
  }, []);

  async function handleRegister(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;

    axios
      .post(
        `http://localhost:4000/api/session/register`,
        { email, password, name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setRegisterData(res.data);
        // @ts-ignore
        registerFormRef.current.reset();
      })

      .catch((error) => {
        setRegisterData(error.response.data);
      });
  }

  async function handleLoginSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    axios
      .post(
        `http://localhost:4000/api/session`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => setLoginData(res.data))
      .catch((error) => {
        // console.log(error);
        setLoginData(error.response.data);
      });
  }

  async function getSessionData() {
    axios
      .get(`http://localhost:4000/api/session`, {
        withCredentials: true,
      })
      .then((res) => setSessionData(res.data))
      .catch((error) => setSessionData(error.response.data));
  }

  async function logout() {
    axios
      .delete(`http://localhost:4000/api/session`, {
        withCredentials: true,
      })
      .then((res) => setLogoutData(res.data))
      .catch((error) => setLogoutData(error.response.data));
  }

  return (
    <div className="App">
      <div className="server">
        {serverHealth ? (
          <h3>Server is up and Running 🤩</h3>
        ) : (
          <h3>Some Issue with Server 😔</h3>
        )}
      </div>
      <div className="wrapper">
        <div className="form">
          <form ref={registerFormRef} onSubmit={handleRegister}>
            <h2>Register</h2>
            <input required type="email" id="email" placeholder="email" />
            <input
              required
              type="password"
              id="password"
              placeholder="password"
              autoComplete="on"
              minLength={6}
            />
            <input required type="text" id="name" placeholder="name" />
            <button>Register</button>
          </form>

          <div className="data">{JSON.stringify(registerData)}</div>
        </div>
      </div>

      <div className="wrapper">
        <div className="form">
          <form onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <input required type="email" id="email" placeholder="email" />
            <input
              required
              type="password"
              id="password"
              placeholder="password"
              minLength={6}
              autoComplete="on"
            />
            <button>Login</button>
          </form>
          <div className="data">{JSON.stringify(loginData)}</div>
        </div>
      </div>

      <div className="wrapper">
        <div className="form">
          <h2>Session</h2>
          <button onClick={getSessionData}>Get session data</button>
          <div className="data">{JSON.stringify(sessionData, null, 4)}</div>
        </div>
      </div>

      <div className="wrapper">
        <div className="form">
          <h2>Logout</h2>
          <button onClick={logout}>Logout</button>
          <div className="data">{JSON.stringify(logoutData, null, 4)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
