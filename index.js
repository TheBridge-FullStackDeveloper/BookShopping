const express = require("express")
const app = express()
const PORT = 8000
const { typeError } = require('./middlewares/errors');

app.use(express.json())

app.use("/books",require("./routes/books"))
app.use("/genres",require("./routes/genres"))
app.use("/users",require("./routes/users"))

app.use(typeError)

app.listen(PORT,()=> console.log(`Servidor levantado en el puerto ${PORT}`))