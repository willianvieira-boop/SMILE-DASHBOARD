const admin = require('firebase-admin');
require('dotenv').config();

// Inicializar Firebase Admin SDK
try {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // Você pode adicionar credenciais de serviço aqui se necessário
  });
  console.log('Firebase inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
}

module.exports = admin;