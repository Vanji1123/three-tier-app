import { useState } from "react";
import axios from "axios";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

  const response = await axios.post(
  '/api/users',
  formData
);

    console.log(response.data);

    alert("User Registered Successfully 💖");

  } catch (error) {

    console.log(error);

    alert("Error submitting form");

  }

};

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.iconCircle}>
          👤
        </div>

        <h1 style={styles.heading}>
          User Registration
        </h1>

        <p style={styles.subHeading}>
          Create your account
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>

        </form>

        <p style={styles.footer}>
          Thank you for registering with us 💕
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    padding: "20px",
    fontFamily: "Arial"
  },

  card: {
    width: "430px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(59,130,246,0.2)",
    textAlign: "center"
  },

  iconCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #60a5fa)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    color: "white",
    margin: "0 auto 20px auto",
    boxShadow: "0 5px 15px rgba(59,130,246,0.4)"
  },

  heading: {
    color: "#1d4ed8",
    fontSize: "42px",
    marginBottom: "10px",
    fontWeight: "bold"
  },

  subHeading: {
    color: "#64748b",
    marginBottom: "30px",
    fontSize: "16px"
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #93c5fd",
    fontSize: "16px",
    outline: "none",
    background: "#f8fbff",
    boxSizing: "border-box"
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #93c5fd",
    fontSize: "16px",
    outline: "none",
    resize: "none",
    background: "#f8fbff",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(59,130,246,0.3)"
  },

  footer: {
    marginTop: "25px",
    color: "#64748b",
    fontSize: "14px"
  }

};
export default App;
