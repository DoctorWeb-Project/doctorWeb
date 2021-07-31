import React from 'react'
import Logo from '../../assets/logo.png'
import {FiArrowLeft} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './styles.css'
import { DarkButton } from '../../components/DarkButton'

export function Register(){
    return(
        <div className="registerContainer">
            <header>
                <img src={Logo} alt="DoctorWeb"/>
                <div className="returnArrow">
                    <FiArrowLeft size={24} color="#8257E5" />
                    <Link to="/login">
                        Voltar para o Login
                    </Link>
                </div>
            </header>

            <form className="registerForm">
                <h1>Cadastro de usuário</h1>
                <h2>Dados</h2>

                <label>Nome</label>
                <input />
                
                <div className="inputWrapper">
                    <div className="leftSideColumn">
                        <label>Número do cpf</label>
                        <input />

                        <label>Número do SUS</label>
                        <input />

                        <label>Sexo</label>
                        <input />

                        <label>Senha</label>
                        <input />
                    </div>
                        
                    <div className="rightSideColumn">
                        <label>Número do RG</label>
                        <input />
                            
                        <label>Data de nascimento</label>
                        <input />
                            
                        <label>Peso</label>
                        <input />
                            
                        <label>Confirmar senha</label>
                        <input />
                    </div>
                </div>
                
                <DarkButton title="Enviar" navigateTo="#" type="submit" action="" />

            </form>

        </div>
    )
}