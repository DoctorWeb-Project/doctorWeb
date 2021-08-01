import React, { useEffect, useState } from 'react'
import { Appointment } from '../../components/Appointment'
import {DarkButton} from '../../components/DarkButton'
import Logo from '../../assets/logo.png'
import {FiEdit} from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import moment from 'moment'
import { date } from 'yup'


export function Planner(){
    const [appointments, setAppointments] = useState([])
    const [modalVissible, setModalVisible] = useState(false)
    const[selectedAppointment, setSelectedAppointment] = useState()
    const [modalType, setModalType] = useState('')

    const history = useHistory()
    const month = moment(new Date()).format('MM')
    const nextMonth = moment(new Date()).add(1, 'M').format('MM')
    const year = new Date().getFullYear()

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

    async function createAppointment(data){
        const date = `${data.date} ${data.time}`
        try {
            await api.post('/criarConsulta', {...data, date: date})
        } catch (error) {
            console.log(error)
        }
    }

    async function updateAppointment(data){
        try {
            await api.post(`/atualizarConsulta/${data.id}`)
        } catch (error) {
            console.log(error)
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
                    <DarkButton title="Adicionar" action={()=> {setModalVisible(true); setModalType('add')}} />
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
                        
                        if(appointment.mes === month && appointment.ano === year ){
                            return(
                                <Appointment onClickEdit={()=>{setModalVisible(true); setModalType('update'); setSelectedAppointment(appointment)}} key={appointment.id} data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Próximo mês</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        if(appointment.mes === nextMonth && appointment.ano === year ){
                            return(
                                <Appointment onClickEdit={()=>{setModalVisible(true); setModalType('update'); setSelectedAppointment(appointment)}} key={appointment.id} data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Seguintes</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        if(appointment.mes > nextMonth ){
                            console.log(appointment)
                            return(
                                <Appointment onClickEdit={()=>{setModalVisible(true); setModalType('update'); setSelectedAppointment(appointment)}} key={appointment.id} data={appointment} />
                            )
                        }
                    })}
                </div>
            </main>

            {modalVissible && (
                <div className="overlay">
                    <div className="modal">
                        <span>{modalType==="add"? 'Nova consulta': modalType=="update"? 'Atualizar consulta': 'Editar usuário' }</span>
                        <Formik
                        initialValues={modalType==="add"? 
                        {name:'', date:'', time:'', price:''} : 
                        {name: selectedAppointment.nome, date: `${selectedAppointment.ano}-${selectedAppointment.mes}-${selectedAppointment.dia}`, time:`${ selectedAppointment.hora}:${selectedAppointment.minutos}`, price: selectedAppointment.preco}}
                        onSubmit={values => modalType==="add"? createAppointment(values) : updateAppointment(values)} 
                        >
                           {({
                               handleChange,
                               handleSubmit,
                               values,
                               errors
                           })=>(
                            <form>
                                    <div className="content">
                                        <div className="leftSideContent">
                                            <label>Nome</label>
                                            <input name="name" value={values.name} onChange={handleChange} />
                                            <label>Data:</label>
                                            <input type="date" name="date" value={values.date} onChange={handleChange} />
                                            <DarkButton title="Criar consulta" type="submit" action={handleSubmit} />
                                        </div>
            
                                        <div className="rightSideContent">
                                            <label>Preço</label>
                                            <input name="price" value={values.price} onChange={handleChange} />
                                            <label>Hora</label>
                                            <input type="time" name="time" value={values.time} onChange={handleChange} />
                                            <DarkButton title="Cancelar" type="button" action={()=> setModalVisible(false)} />
                                        </div>
                                    </div>
                            </form>
                           )}
                        </Formik>
        
                    </div>
                </div>
            )}
        </div>
    )
}