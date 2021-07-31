import React from 'react'
import './styles.css'

export function DarkButton(props){
    return(
        <button className="darkButton" type={props.type}>{props.title}</button>
    )
}