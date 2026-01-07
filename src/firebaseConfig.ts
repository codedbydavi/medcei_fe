// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";

// --- SUAS CHAVES DO FIREBASE ---
// Você pega esses dados no Console: Configurações do Projeto > Geral > Seus aplicativos
const firebaseConfig = {
  apiKey: "AIzaSyBlXzHAE-tqGykST6ZRjWT9hx8v3RvKXDI",
  authDomain: "medcei-app.firebaseapp.com",
  projectId: "medcei-app",
  storageBucket: "medcei-app.firebasestorage.app",
  messagingSenderId: "235232526862",
  appId: "1:235232526862:web:4861f95ec3d7215bb1325f",
  measurementId: "G-B8BXM5ZBD5"
};

// 1. Inicializa o App
const app = initializeApp(firebaseConfig);

// 2. Inicializa a Autenticação
const auth = getAuth(app);

// 3. Configura o Login com Microsoft
const microsoftProvider = new OAuthProvider('microsoft.com');

// (Opcional) Define escopos: O que você quer acessar da conta Microsoft do usuário?
// 'user.read' é o básico para ler o perfil. 'mail.read' permite ler emails (cuidado com privacidade).
microsoftProvider.addScope('user.read');

// (Opcional) Força a escolha de conta (útil se a pessoa tiver conta pessoal e profissional)
microsoftProvider.setCustomParameters({
  prompt: 'select_account',
  // Se for uma conta corporativa específica (Azure AD), às vezes precisa do tenant:
  // tenant: 'SEU-TENANT-ID-AQUI' 
});

// 4. Exporta para usar no LoginPage
export { auth, microsoftProvider };