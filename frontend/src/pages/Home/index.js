import React from 'react'
import Logo from '../../assets/logo.png'
import medicine from '../../assets/medicine.svg'


import './styles.css'
import { PurpleButton } from '../../components/PurpleButton'

export function Home(){
    return(
        <div className="container">
            <header>
                <img className="doctorweb1" src={Logo} alt="DoctorWeb"></img>
            </header>

            <main>
                <div className="textContent">
                    <h1>Otimiza seu tempo e cuida da sua saúde</h1>
                    <p>Ajudamos pessoas a organizarem suas consultas médicas.</p>
                   <PurpleButton title="Fazer Login" navigateTo="/login" />

                </div>
                <div className="background-image">
                    <img src={medicine} alt="DoctorWeb"></img>
                </div>
            </main>

        </div>
    )
}