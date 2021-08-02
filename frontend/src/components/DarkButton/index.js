import React from 'react'
import './styles.css'

export function DarkButton(props){
    return(
        <button id={props.id} className="darkButton" type={props.type} onClick={props.action}>{props.title}</button>
    )
}