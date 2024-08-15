function debit(Id,CurentAmount,Amount){
    return Users.findByIdAndUpdate(Id,{amount:CurentAmount - Amount})
}

module.exports = debit