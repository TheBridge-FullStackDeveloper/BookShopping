const express = require("express")
const app = express()
const PORT = 8000

app.use(express.json())

app.use("/books",require("./routes/books"))
app.use("/genres",require("./routes/genres"))

app.listen(PORT,()=> console.log(`Servidor levantado en el puerto ${PORT}`))