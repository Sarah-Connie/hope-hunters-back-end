const { seedDatabase } = require("./database")


seedDatabase().then(() => {
    console.log('Database seeded.')
}).catch(error => {
    console.log('Unable to seed data.')
    console.log(error)
})