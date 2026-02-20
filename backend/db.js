
import dontenv from 'dotenv'
import mysql from 'mysql2'
dontenv.config()
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        console.log("error",err)
    }
    else{
        console.log("database connection successful")
    }
})

export default db;