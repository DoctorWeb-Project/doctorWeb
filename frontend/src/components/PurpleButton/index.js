import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

export function PurpleButton(props){
    return props.element === "button"? (
        <button className="purpleButton" type={props.type} to={props.navigateTo}>
            <div className="loginIcon">
                <FiLogIn size={24} color="#FFF"/>
            </div>
            <span>{props.title}</span>
        </button>
    ) : (
        <Link className="purpleButton" to={props.navigateTo}>
            <div className="loginIcon">
                <FiLogIn size={24} color="#FFF"/>
            </div>
            <span>{props.title}</span>
        </Link>
    )
}