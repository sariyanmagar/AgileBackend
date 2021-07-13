const Registration = require('../models/userModel');
const mongoose = require('mongoose');


const url = 'mongodb://127.0.0.1:27017/GameRental';

beforeAll(async () => {
    await mongoose.connect(url,
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe("User Testing", () => {

    it("User Registration Testing", () => {
        const user = {
            fullname: "unittest1",
            gender: "female",
            email: "unittest1@gmail.com",
            phone: "9845236124",
            address: "softwarica",
            username: "testing",
            password: "123456"

        }

        return Registration.create(user)
            .then((reg_ret) => {
                expect(reg_ret.fullname).toEqual("unittest1")
            })
    })

    // Login Testing 
    it("User Login Testing", async () => {
        return Registration.findOne({
            "username": "testing",
            "password": "123456"
        })
            .then(user => {
                console.log(user)
                expect(user.username).toEqual("testing")
            })
    })
})

