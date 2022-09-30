import * as express from "express"
import { connectDB } from "./database/db";
import { PORT, API_PATH } from "./utils/config";
import * as Colors from 'colors.ts'
Colors.colors('','')


connectDB();

const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())

app.use(`${API_PATH}`,require('./routes/mainrouter'));

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));