import express from 'express';
import cors from 'cors';
import router from "./routes/";

const app = express();

app.use(cors({ origin: ['https://telex.im', 'https://trello.com'] }));
app.use(express.static('public'));

app.use('/', router);

app.listen(5000, () => console.log("Server runnning on port 5000"));
