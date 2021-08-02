import React from 'react'
import Logo from '../../assets/logo.png'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import { DarkButton } from '../../components/DarkButton'
import { Formik, Field } from 'formik'
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
                        <Field name="name" value={values.name} onChange={handleChange} />
                        {errors.name && <span className="Error">{errors.name}</span>}
                        
                        <div className="inputWrapper">
                            <div className="leftSideColumn">
                                <label>Número do cpf</label>
                                <Field name="cpf" value={values.cpf} onChange={handleChange} />
                                {errors.cpf && <span  className="Error">{errors.cpf}</span>}

                                <label>Número do SUS</label>
                                <Field name="sus" value={values.sus} onChange={handleChange} />
                                {errors.sus && <span  className="Error">{errors.sus}</span>}

                                <label>Sexo</label>
                                <Field name="sex" value={values.sex} onChange={handleChange} />
                                {errors.sex && <span  className="Error">{errors.sex}</span>}

                                <label>Senha</label>
                                <Field type="password" name="password" value={values.password} onChange={handleChange} />
                                {errors.password && <span  className="Error">{errors.password}</span>}

                            </div>
                                
                            <div className="rightSideColumn">
                                <label>Número do RG</label>
                                <Field name="rg" value={values.rg} onChange={handleChange} />
                                {errors.rg && <span  className="Error" >{errors.rg}</span>}
                                    
                                <label>Data de nascimento</label>
                                <Field name="birthdate" value={values.birthdate} onChange={handleChange} />
                                {errors.birthdate && <span  className="Error" >{errors.birthdate}</span>}
                                    
                                <label>Peso</label>
                                <Field name="weight" value={values.weight} onChange={handleChange} />
                                {errors.weight && <span  className="Error" >{errors.weight}</span>}
                                    
                                <label>Confirmar senha</label>
                                <Field type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} />
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