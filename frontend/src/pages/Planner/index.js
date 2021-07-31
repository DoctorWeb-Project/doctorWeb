import React from 'react'
import { Appointment } from '../../components/Appointment'
import {DarkButton} from '../../components/DarkButton'
import Logo from '../../assets/logo.png'
import {FiEdit} from 'react-icons/fi'

import './styles.css'

export function Planner(){
    return(
        <div className="plannerContainer">
            <header>
                <img src={Logo} alt="DoctorWeb"/>
                
                <div className="userArea">
                    <DarkButton title="Adicionar" />
                    <span>Bem-vindo, Fulano</span>
                    <div className="userIcon">F</div>
                    <div className="editInfo">
                        <FiEdit color="#FFFF" size={24} />
                    </div>
                </div>

            </header>

            <main>
                <div className="card">
                    <h1>Este mês</h1>
                    <Appointment />
                    <Appointment />
                    <Appointment />
                    <Appointment />
                </div>
                <div className="card">
                    <h1>Próximo mês</h1>
                    <Appointment />
                    <Appointment />
                    <Appointment />
                    <Appointment />
                </div>
                <div className="card">
                    <h1>Seguintes</h1>
                    <Appointment />
                    <Appointment />
                    <Appointment />
                    <Appointment />
                </div>
            </main>

        </div>
    )
}