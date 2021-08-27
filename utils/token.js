const verifyToken = (token,tokenKey)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,tokenKey,(err,decoded)=>{
            err ? resolve("Token Expired!!"):resolve(decoded)
        })
    })
}