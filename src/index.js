const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common.key = 'a8be5cd808491d7418dd4b76b7884dc6';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/provinsi', async (req, res) => {
  const queryInput = req.query;
  if (Object.keys(queryInput).length === 0) { // object query empty
    try {
      const response = await axios.get('/province');
      res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (queryInput.provId) {
    try {
      const response = await axios.get(`/province?id=${queryInput.provId}`);
      res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
});

app.get('/kota', async (req, res) => {
  const queryInput = req.query;
  if (Object.keys(queryInput).length === 0) { // object query empty
    try {
      const response = await axios.get('/city');
      res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (queryInput.provId) {
    try {
      const response = await axios.get(`/city?province=${queryInput.provId}`);
      res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
});

app.get('/ongkir', async (req, res) => {
  const bodyInput = req.query;
  const {
    origin, destination, weight, courier,
  } = bodyInput;
  try {
    const response = await axios.post('/cost', {
      origin,
      destination,
      weight,
      courier,
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));

// app.use('/.netlify/functions/index', router);

// module.exports.handler = serverless(app);
