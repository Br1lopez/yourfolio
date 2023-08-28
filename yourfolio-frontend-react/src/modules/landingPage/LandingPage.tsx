import React from 'react'
import { useNavigate } from 'react-router-dom'
import './landingPage.scss'

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className='landing-page'>
            <div className="landing-page__block">
                <h1>YOURFOLIO</h1>
                <p>Crea tu currículum visual en minutos.</p>
                <div className="landing-page__block__buttons">
                    <button onClick={() => { navigate("/register"); }}>
                        Registrarse
                    </button>
                    <button onClick={() => { navigate("/login"); }}>
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage