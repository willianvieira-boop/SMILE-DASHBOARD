const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de Teste (Root)
app.get('/', (req, res) => {
  res.json({
    message: 'Smile Dashboard - Servidor rodando com sucesso!',
    status: 'online',
    timestamp: new Date()
  });
});

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota para Testar Firebase
app.get('/api/firebase', (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Configurado' : 'Nao configurado',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Configurado' : 'Nao configurado',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Configurado' : 'Nao configurado'
  };
  res.json(firebaseConfig);
});

// Porta dinamica (importante para Vercel)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
  console.log('Smile Dashboard esta online!');
});