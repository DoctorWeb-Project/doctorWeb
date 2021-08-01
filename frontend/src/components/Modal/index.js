import React from 'react'
import { DarkButton } from '../DarkButton'

import './styles.css'

export function Modal(props){
    return(
        <div className="overlay">
            <div className="modal">
                <span>{props.title}</span>
                <form>
                    <label>Nome</label>
                    <input />
                        <div className="content">
                            <div className="leftSideContent">
                                <label>Data:</label>
                                <input />
                                <DarkButton title="Criar consulta" />
                            </div>

                            <div className="rightSideContent">
                                <label>Preço</label>
                                <input />
                                <DarkButton title="Cancelar" type="button" action={()=> props.setStateFunction(false)} />
                            </div>
                        </div>
                </form>

            </div>
        </div>
    )
}