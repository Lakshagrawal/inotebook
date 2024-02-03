const express = require('express')
const app = express()
app.use(express.json())
const connectToMongo = require("./db")
const port = 5000

app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))

app.listen(port, () => {
    connectToMongo();
  console.log(`Example app listening on port ${port}`)
})
