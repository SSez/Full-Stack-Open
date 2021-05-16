const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3] || null
const newNumber = process.argv[4] || null

const url = `mongodb+srv://fullstack:${password}@cluster0.lsmd4.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const PersonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})
const Person = mongoose.model("Person",PersonSchema);

if(!newName || !newNumber) {
    Person.find({}).then((result) => {
        console.log("Phonebook:")
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).catch((error) => {
        throw error
    })
} else {
    const person = new Person({
        name: newName,
        number: newNumber
    })
    person.save().then(() => {
        console.info(`Added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    }).catch((error) => {
        throw error
    })
}