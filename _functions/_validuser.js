function isValidUser(Username,Password,data){
    if(data){
        if(data.password == Password){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
module.exports = isValidUser

