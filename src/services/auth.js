const jwt = require('jsonwebtoken')

function generateAccessToken(userRG){
    const authUser = {rg: userRG}
    const accessToken = jwt.sign(authUser,''+process.env.TOKEN_SECRET, {'expiresIn': '20min'})
    return accessToken
}

function authenticateToken(request, response, next){
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return response.sendStatus(401)

    jwt.verify(token,''+process.env.TOKEN_SECRET, (error, userRG)=>{
        if(error) return response.sendStatus(403)
        request.user = userRG

        next()
    } )
}

module.exports ={
    generateAccessToken,
    authenticateToken
}

