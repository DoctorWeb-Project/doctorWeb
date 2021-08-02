import React, { useEffect, useState } from 'react'
import { Appointment } from '../../components/Appointment'
import {DarkButton} from '../../components/DarkButton'
import Logo from '../../assets/logo.png'
import {FiEdit, FiX} from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import moment from 'moment'



export function Planner(){
    const [appointments, setAppointments] = useState([])
    const [modalVissible, setModalVisible] = useState(false)
    const[selectedAppointment, setSelectedAppointment] = useState()
    const [modalType, setModalType] = useState('')
    const [reloadAppointemnts, setReloadAppointments] = useState(false)

    const history = useHistory()
    const month = moment(new Date()).format('MM')
    const nextMonth = moment(new Date()).add(1, 'M').format('MM')
    const year = new Date().getFullYear()

    async function createAppointment(data){
        const date = `${data.date} ${data.time}`
        try {
            await api.post('/criarConsulta', {...data, date: date})
            setModalVisible(false)
            setReloadAppointments(!reloadAppointemnts)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateAppointment(values){
        const data = {
            name: values.name,
            price: values.price,
            date:`${values.date} ${values.time}`
        }
        try {
            console.log(selectedAppointment.id)
            await api.put(`/atualizarConsulta/${selectedAppointment.id}`, data)
            setModalVisible(false)
            setReloadAppointments(!reloadAppointemnts)

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteAppointment(){
        try {
            await api.delete(`/deletarConsulta/${selectedAppointment.id}`)
            setModalVisible(false)
            setReloadAppointments(!reloadAppointemnts)
        } catch (error) {
            console.log(error)
        }
    }

    function handleAppointmentEditClick(appointment){
        setModalVisible(true) 
        setModalType('update')
        setSelectedAppointment(appointment)
    }

    function handleAppointmentDeleteClick(appointment){
        setModalVisible(true)
        setModalType('delete')
        setSelectedAppointment(appointment)
    }

  

    useEffect(()=>{
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

        loadAppointments()
    },[reloadAppointemnts, history])

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
                                <Appointment
                                onClickDelete={()=> handleAppointmentDeleteClick(appointment)} 
                                onClickEdit={()=>handleAppointmentEditClick(appointment)} 
                                key={appointment.id} 
                                data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Próximo mês</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        if(appointment.mes === nextMonth && appointment.ano === year ){
                            return(
                                <Appointment
                                onClickDelete={()=> handleAppointmentDeleteClick(appointment)} 
                                onClickEdit={()=>handleAppointmentEditClick(appointment)} 
                                key={appointment.id} 
                                data={appointment} />
                            )
                        }
                    })}
                </div>
                <div className="card">
                    <h1>Seguintes</h1>
                    { appointments.length>0 && appointments.map(appointment => {
                        if(appointment.mes > nextMonth ){
                            return(
                                <Appointment
                                onClickDelete={()=> handleAppointmentDeleteClick(appointment)} 
                                onClickEdit={()=>handleAppointmentEditClick(appointment)} 
                                key={appointment.id} 
                                data={appointment} />
                            )
                        }
                    })}
                </div>
            </main>

            {modalVissible && (
                <div className="overlay">
                    <div className="modal">
                        <header>
                            <span>{modalType==="add"? 'Nova consulta': modalType=="update"? 'Atualizar consulta': 'Deletar consulta?' }</span>
                            <FiX className="closeButton" onClick={()=>setModalVisible(false)} color="#F54A4A" size={24} />
                        </header>
                        {modalType !=='delete'? (
                            <Formik
                            initialValues={modalType==="add"? 
                            {name:'', date:'', time:'', price:''} : 
                            {name: selectedAppointment.nome, date: `${selectedAppointment.ano}-${selectedAppointment.mes}-${selectedAppointment.dia}`, time:`${ selectedAppointment.hora}:${selectedAppointment.minutos}`, price: selectedAppointment.preco}}
                            onSubmit={values => modalType==="add"? createAppointment(values) : 
                            updateAppointment(values)} 
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
                                            </div>
                
                                            <div className="rightSideContent">
                                                <label>Preço</label>
                                                <input name="price" value={values.price} onChange={handleChange} />
                                                <label>Hora</label>
                                                <input type="time" name="time" value={values.time} onChange={handleChange} />
                                                    <DarkButton title={modalType==="add"? "Criar consulta": "Atualizar Consulta"} type="submit" action={handleSubmit} />    
                                            </div>
                                        </div>
                                </form>
                               )}
                            </Formik>
                        ): (
                            <>
                                <Appointment data={selectedAppointment} />
                                <DarkButton  title="Sim, deletar" type="submit" action={deleteAppointment} />
                            </>
                        )}
        
                    </div>
                </div>
            )}
        </div>
    )
}