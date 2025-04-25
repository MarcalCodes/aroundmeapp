import express from 'express'
import userRoutes from './src/routes/userRoutes.js'
import areaRoutes from './src/routes/areaRoutes.js'
import eventRoutes from './src/routes/eventRoutes.js'
import subscriptionRoutes from './src/routes/subscriptionRoutes.js'

const app = express()
const port = 3000

app.use(express.json());
app.use('/users', userRoutes);
app.use('/areas', areaRoutes);
app.use('/events', eventRoutes);
app.use('/subscriptions', subscriptionRoutes);

app.get('/', (request, response) => {
    response.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})