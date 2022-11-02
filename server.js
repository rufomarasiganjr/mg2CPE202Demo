const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const tempRoutes = require('./routes/api/temperature.js');
const tempAuth = require('./routes/api/auth');

app.get('/', (req, res) => res.send('API Running, No Error'));
app.use(express.json({ extend: false }));

app.use('/temperature', tempRoutes);
app.use('/auth', tempAuth);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
