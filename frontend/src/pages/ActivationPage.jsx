import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from "../../server";

function ActivationPage() {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, {
                        activation_token,
                    });
                    console.log("Success:", res.data.message);
                    setSuccess(true);
                } catch (error) {
                    const errMsg = error?.response?.data?.message || "Activation failed";
  alert(errMsg); // ✅ Show proper error
  console.error("Error:", errMsg);
  setError(true);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {error ? (
                <p>Your token is expired</p>
            ) : success ? (
                <p>Your account has been created successfully</p>
            ) : (
                <p>Activating your account...</p>
            )}
        </div>
    );
}

export default ActivationPage;
