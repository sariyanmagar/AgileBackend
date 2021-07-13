const Registration = require('../models/adminModel');
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

describe("Admin Testing", () => {

    it("Admin Registration Testing", () => {
        const admin = {
            admin_name: "unittest1",
            admin_password: "123456"

        }

        return Registration.create(admin)
            .then((reg_ret) => {
                expect(reg_ret.admin_name).toEqual("unittest1")
            })
    })

    // Login Testing 
    it("Admin Login Testing", async () => {
        return Registration.findOne({
            "admin_name": "unittest1",
            "admin_password": "123456"
        })
            .then(admin => {
                console.log(admin)
                expect(admin.admin_name).toEqual("unittest1")
            })
    })
})

