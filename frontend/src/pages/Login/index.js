import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { PurpleButton } from '../../components/PurpleButton'

import './styles.css'

export function Login(){
    return(
        <div className="loginContainer">
            <header>
            <img className="doctorweb2" src={Logo} alt="DoctorWeb"></img>
            </header>

            <main>
                <h1>Otimiza seu tempo e cuida da sua saúde</h1>
                <p>Ajudamos pessoas a organizarem suas consultas médicas.</p>

                <input placeholder="Nome de usuário" />
                <input placeholder="Senha" />
                <PurpleButton title="Entrar" navigateTo="#" />

                <span>Não possui uma conta? <Link to="/register">Clique aqui!</Link></span>
            </main>

        </div>
    )
}