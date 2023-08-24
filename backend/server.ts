import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import cors from 'cors' // Import the cors package
import path from 'path'

const app = express()
const port = 3333

app.use(cors()) // Use cors middleware

app.use(bodyParser.json())

const serverDataPath = path.join(__dirname, 'server.json')

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API dt-money' })
})

app.get('/transactions', (req, res) => {
  try {
    // Carregar os dados do server.json
    const serverData = JSON.parse(fs.readFileSync(serverDataPath, 'utf-8'))

    // Retornar as transações
    res.json(serverData.transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

app.post('/transactions', (req, res) => {
  try {
    const newTransaction = req.body

    // Load existing transactions
    const serverData = JSON.parse(fs.readFileSync(serverDataPath, 'utf-8'))
    const transactions = serverData.transactions || []

    // Generate a new transaction id
    const maxId = Math.max(
      ...transactions.map((transaction: any) => transaction.id),
      0
    )
    newTransaction.id = maxId + 1

    // Add the new transaction
    transactions.push(newTransaction)

    serverData.transactions = transactions
    fs.writeFileSync(
      serverDataPath,
      JSON.stringify(serverData, null, 2),
      'utf-8'
    )

    res.status(201).json(newTransaction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port:${port}`)
})
