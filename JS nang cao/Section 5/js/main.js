import { Student } from './student.js';
import * as main from './main.js'

let Students =[{id:1,name:"Tien",address:"Ha Dong",marjor:"IT"},
{id:2,name:"A",address:"Ha Dong",marjor:"IT"},
{id:3,name:"B",address:"Ha Dong",marjor:"CNTT"},
{id:4,name:"C",address:"Ha Dong",marjor:"CNTT"},
{id:5,name:"D",address:"Ha Dong",marjor:"CNTT"}]

//Dung forEach de in ra thong tin Student
Students.forEach(function (person) {
    console.log("Thong tin person : Id: "+person.id+"/ Name:"+person.name+"/ Address:"+person.address+"/ Chuyen nganh:"+person.marjor)
})
//dùng filter để lọc ra Student có marjor = "IT"
let marjorIT=Students.filter(function (person) {
    if (person.marjor == "IT") {
        console.log("Id : "+person.id+"/ Name: "+person.name)
    }
    
})
//Dùng map để tạo ra một mảng Student mới , mỗi Student có thêm thuộc tính school = "JMaster"
let mapStu = Students.map(function (student) {//tra ve 1 mang
    return student.school ="JMaster"
})
console.log(mapStu)

// //su dung Dùng findIndex và filter dể lọc ra sinh viên không bị trùng id.

const newPerson = Students.filter((item, index, self) => 
index === self.findIndex((t) => ( t._id === item._id))
)