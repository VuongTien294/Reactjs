class Person {
    constructor(id, name, address) {
        this._id = id
        this._name = name
        this._address = address
    }
    info() {
        console.log(this._id + "-" + this._name + "-" + this._address)
    }
}
export class Student extends Person {
    constructor(id, name, address, marjor) {
        super(id, name, address)
        this._marjor = marjor
    }
    // Ghi đè (override) phương thức cùng tên của lớp cha.
    info() {
        console.log(this._id + "-" + this._name + "-" + this._address+"-"+this._marjor)
    }
}