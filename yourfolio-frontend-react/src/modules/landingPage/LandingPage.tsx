import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div><h1>YOURFOLIO GOAPISIMO</h1>
            <p>Te vas a registrar o eres un puto mierdas? te boy a rebentar eh gilipollas</p>
            <button onClick={() => { navigate("/login"); }}>
                Entra hostia
            </button>
            <button onClick={() => { navigate("/register"); }}>
                Registrate tambien
            </button></div>
    )
}

export default LandingPage