import React from 'react'
import {FiEdit, FiCalendar, FiClock} from 'react-icons/fi'

import './styles.css'

export function Appointment(){
    return(
        <div className="appointment">
            <div className="singleLine" />
            <div className="appointmentAction">
                <span>Consulta ao dentista</span>
                <FiEdit color="#8257E5" size={24} />
            </div>
            <div className="appointmentInfo">
                <FiCalendar color="#9C7AE9" size={24} />
                
                <span className="dateSpan">24/07</span>
                <span className="pipe">|</span>
                <FiClock color="#34CB79" size={24} />
                <span className="timeSpan">14:10</span>
                <span className="pipe">|</span>
                <span className="priceSpan">R$ 250,00</span>

            </div>
        </div>
    )
}