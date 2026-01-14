import express from 'express';
import cors from 'cors';
import { HealthController } from './controllers/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const healthController = new HealthController();

app.get('/ping', healthController.ping);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});