import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { PurpleButton } from '../../components/PurpleButton'
import { useUser } from '../../contexts/userContext'
import api from '../../services/api'

import './styles.css'

export function Login(){
    const [cpf, setCPF] = useState('')
    const [password, setPassword] = useState('')
    const {saveUserTokenToStorage} = useUser()
    const history = useHistory()

    async function signIn(event){
        event.preventDefault()
        try{
            const response = await api.post('/login', {cpf: cpf, senha: password})
            saveUserTokenToStorage(response.data)
            console.log(response.data)
            history.push('/planner')

        } catch (error) {
            console.log(error)

            if(error.response){
                if(error.response.status ===404){
                    alert('Desculpe, usuário ou senha incorretos. Tente novamente')
                }
    
                if(error.response.status ===500){
                    alert("Desculpe, houve uma falha interna. Tente novavente mais tarde.")
                }
            }
            
        }
        
    }

    return(
        <div className="loginContainer">
            <header>
            <img className="doctorweb2" src={Logo} alt="DoctorWeb"></img>
            </header>

            <main>
                <h1>Otimiza seu tempo e cuida da sua saúde</h1>
                <p>Ajudamos pessoas a organizarem suas consultas médicas.</p>

                <form onSubmit={signIn}>
                    <input value={cpf} onChange={event => setCPF(event.target.value)} placeholder="número do cpf" />
                    <input value={password} onChange={event=>setPassword(event.target.value)} type="password" placeholder="Senha" />
                    <PurpleButton title="Entrar" element="button" type="submit"/>
                </form>

                <span>Não possui uma conta? <Link to="/register">Clique aqui!</Link></span>
            </main>

        </div>
    )
}