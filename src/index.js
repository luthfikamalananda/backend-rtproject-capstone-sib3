const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const axios = require('axios');

const router = express.Router();

// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common.key = 'a8be5cd808491d7418dd4b76b7884dc6';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/provinsi', async (req, res) => {
  const queryInput = req.query;
  if (Object.keys(queryInput).length === 0) { // object query empty
    try {
      const response = await axios.get('/province');
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (queryInput.provId) {
    try {
      const response = await axios.get(`/province?id=${queryInput.provId}`);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
});

router.get('/kota', async (req, res) => {
  const queryInput = req.query;
  if (Object.keys(queryInput).length === 0) { // object query empty
    try {
      const response = await axios.get('/city');
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (queryInput.provId) {
    try {
      const response = await axios.get(`/city?province=${queryInput.provId}`);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
});

router.post('/ongkir', async (req, res) => {
  const bodyInput = req.body;
  const {
    origin, destination, weight, courier,
  } = bodyInput;
  if (origin && destination && weight && courier) {
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
  } else {
    res.send('harap masukkan data yang benar');
  }
});

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));