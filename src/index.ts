import express from 'express';
import cors from 'cors';
import router from "./routes/";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: ['https://telex.im', 'https://trello.com'] }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);

app.listen(port, () => console.log("Server runnning on port 5000"));
