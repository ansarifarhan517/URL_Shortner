import express from "express";
import path from "path";
import urlRouter from './routes/url.js'
import authenticateRouter from './routes/authenticate.js'
import connectToMongoDb from './connect.js'
import staticRouter from './routes/staticRouter.js'
const app = express();
const PORT = 8000;

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(() => console.log('Connected MongoDb'))
.catch((error) => console.log('Error In Connecting Db',error))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.json()) //supports handling json data
app.use(express.urlencoded({extended:false})) //supports handling form data


app.use('/', staticRouter);
app.use('/api/url', urlRouter);
app.use('/api/authenticate', authenticateRouter);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON :${PORT} PORT`))