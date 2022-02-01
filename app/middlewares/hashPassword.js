import bcrypt, { hash } from 'bcrypt';


const hashPassword = (req, res, next) => {
    const { password } = req.body;

    const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(hash => {
              req.body.password = hash;
              next();
          
        }).catch(err => {
            console.log(err);
        });
   
}

export{
    hashPassword
}