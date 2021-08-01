import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name: yup.string().required('campo obrigatório'),
    cpf: yup.string().test('len', 'cpf inválido', value => value.length ===11).required("csmpo obrigatório"), 
    sus: yup.string().test('len', 'número do sus inválido', value => value.length ===15).required('campo obrigatório'), 
    sex: yup.string().required('campo obrigatório') , 
    password:yup.string().required("campo obrigatório"), 
    rg: yup.string().test('len', 'número de RG inválido', value => value.length ===14).required('campo obrigatório'), 
    birthdate:yup.string().required('campo obrigatório'), 
    weight:yup.string().required('campo obrigatório'), 
    confirmPassword:yup.string().oneOf([yup.ref('password'), null], "As senhas não combinam").required("campo obrigatório")
})