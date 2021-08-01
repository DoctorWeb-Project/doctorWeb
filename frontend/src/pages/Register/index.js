import React from 'react'
import Logo from '../../assets/logo.png'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import { DarkButton } from '../../components/DarkButton'
import { Formik } from 'formik'
import { registerSchema } from '../../Schemas/registerSchema'

export function Register(){
    const history = useHistory()

    async function handleRegisterUser(values){
        try {
            const response = await api.post('/cadastro', values)
            console.log(response.data)
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="registerContainer">
            <header>
                <img src={Logo} alt="DoctorWeb"/>
                <div className="returnArrow">
                    <FiArrowLeft size={24} color="#8257E5" />
                    <Link to="/login">
                        Voltar para o Login
                    </Link>
                </div>
            </header>

            <Formik
            initialValues={{name:'', cpf:'', sus:'', sex:'', password:'', rg:'', birthdate:'', weight:'', confirmPassword:'' }}
            onSubmit={values => handleRegisterUser(values)}
            
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors
                })=>(
                    <main className="registerForm">
                        <h1>Cadastro de usuário</h1>
                        <h2>Dados</h2>

                        <label>Nome</label>
                        <input value={values.name} onChange={handleChange('name')} />
                        {errors.name && <span className="Error">{errors.name}</span>}
                        
                        <div className="inputWrapper">
                            <div className="leftSideColumn">
                                <label>Número do cpf</label>
                                <input value={values.cpf} onChange={handleChange('cpf')} />
                                {errors.cpf && <span  className="Error">{errors.cpf}</span>}

                                <label>Número do SUS</label>
                                <input value={values.sus} onChange={handleChange('sus')} />
                                {errors.sus && <span  className="Error">{errors.sus}</span>}

                                <label>Sexo</label>
                                <input value={values.sex} onChange={handleChange('sex')} />
                                {errors.sex && <span  className="Error">{errors.sex}</span>}

                                <label>Senha</label>
                                <input value={values.password} onChange={handleChange('password')} />
                                {errors.password && <span  className="Error">{errors.password}</span>}

                            </div>
                                
                            <div className="rightSideColumn">
                                <label>Número do RG</label>
                                <input value={values.rg} onChange={handleChange('rg')} />
                                {errors.rg && <span  className="Error" >{errors.rg}</span>}
                                    
                                <label>Data de nascimento</label>
                                <input value={values.birthdate} onChange={handleChange('birthdate')} />
                                {errors.birthdate && <span  className="Error" >{errors.birthdate}</span>}
                                    
                                <label>Peso</label>
                                <input value={values.weight} onChange={handleChange('weight')} />
                                {errors.weight && <span  className="Error" >{errors.weight}</span>}
                                    
                                <label>Confirmar senha</label>
                                <input value={values.confirmPassword} onChange={handleChange('confirmPassword')} />
                                {errors.confirmPassword && <span  className="Error" >{errors.confirmPassword}</span>}
                            </div>
                        </div>
                        
                        <DarkButton title="Enviar" navigateTo="#" type="submit" action={handleSubmit} />

                    </main>
                )}

            </Formik>

        </div>
    )
}