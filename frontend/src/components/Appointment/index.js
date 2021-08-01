import React from 'react'
import {FiEdit, FiCalendar, FiClock} from 'react-icons/fi'

import './styles.css'

export function Appointment(props){
    return(
        <div className="appointment">
            <div className="singleLine" />
            <div className="appointmentAction">
                <span>{props.data?.nome}</span>
                <FiEdit onClick={props.onClickEdit} color="#8257E5" size={24} />
            </div>
            <div className="appointmentInfo">
                <FiCalendar color="#9C7AE9" size={24} />
                
                <span className="dateSpan">{props.data?.dia}/{props.data?.mes}</span>
                <span className="pipe">|</span>
                <FiClock color="#34CB79" size={24} />
                <span className="timeSpan">{props.data?.hora}:{props.data?.minutos}</span>
                <span className="pipe">|</span>
                <span className="priceSpan">R$ {props.data?.preco}</span>

            </div>
        </div>
    )
}