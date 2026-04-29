import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState(null);

  const login = async () => {
    const params = new URLSearchParams();
    params.append("client_id", "my-client");
    params.append("client_secret", "GD1lYO02bTvcgEUEafQP3qrmGNB8UjAU");
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");

    const res = await fetch(
      "/keycloak/realms/louis-tp-iam/protocol/openid-connect/token",
      {
        method: "POST",
	mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const data = await res.json();

    if (data.access_token) {
      setPayload(jwtDecode(data.access_token));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Keycloak Login</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Login</button>

      {payload && (
        <table border="1" style={{ marginTop: 20 }}>
          <tbody>
            {Object.entries(payload).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{String(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
