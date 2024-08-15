function credit(Id,CurentAmount,Amount){
    return Users.findByIdAndUpdate(Id,{amount:CurentAmount + Amount})
}

module.exports = credit