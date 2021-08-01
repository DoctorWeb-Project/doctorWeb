import React, { useEffect, useState } from 'react'
import { Appointment } from '../../components/Appointment'
import {DarkButton} from '../../components/DarkButton'
import Logo from '../../assets/logo.png'
import {FiEdit} from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'


export function Planner(){
    const [appointments, setAppointments] = useState([])
    const history = useHistory()
    const month = new Date().getMonth() +1

    async function loadAppointments(){
        try {
            const response =  await api.get('/minhasConsultas')
            setAppointments(response.data)
        } catch (error) {
            console.log("planner error: ",error.response)
            if(error.response && ( error.response.status === 401 || error.response.status === 403)){
                history.push('/login')
            }
        }
    }


    useEffect(()=>{
        loadAppointments()
    },[])

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
                    { appointments.length>0 && appointments.map(appointment => {
                        console.log(month)
                        if(appointment.mes == month ){
                            return(
                                <Appointment data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Próximo mês</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        console.log(month)
                        if(appointment.mes == month + 1 ){
                            return(
                                <Appointment data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Seguintes</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        console.log(month)
                        if(appointment.mes > month + 1 ){
                            return(
                                <Appointment data={appointment} />
                            )
                        }
                    })}
                </div>
            </main>

        </div>
    )
}