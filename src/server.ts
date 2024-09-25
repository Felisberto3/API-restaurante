import express from 'express'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'

const app = express()
app.use(express.json())

app.use(routes)


const PORT = 3333

app.use(errorHandling)
app.listen(PORT, () => console.log("Server is running at port " + PORT))
