
import bcrypt, { hash } from 'bcrypt';
// let hashValue = 'j';
const hashPassword = (password, saltRounds) => {

    bcrypt.hash(password, saltRounds).then(hashVal => {
        
    })

    
    return 'hhhhhh';
}

export{
    hashPassword
}