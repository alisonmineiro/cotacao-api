const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000; // Porta para a API

app.get('/cotacoes', async (req, res) => {
  try {
    const response = await axios.get('http://www.casaalianca.com.br/site/cambio');
    const $ = cheerio.load(response.data);

    // Substitua pelos seletores CSS corretos do site:
    const cotacaoDolar = $('seletor_css_dolar').text().trim(); 
    const cotacaoEuro = $('seletor_css_euro').text().trim();

    res.json({ 
      dolar: cotacaoDolar, 
      euro: cotacaoEuro 
    });
  } catch (error) {
    console.error('Erro ao buscar cotações:', error);
    res.status(500).send('Erro ao buscar cotações');
  }
});

app.listen(port, () => {
  console.log(`API escutando em http://localhost:${port}`);
});