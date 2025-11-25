// src/services/dbService.js

const DB_NAME = "QrSafeDB";
const DB_VERSION = 3;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Erro ao abrir banco de dados");

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Tabelas
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains("session")) {
        db.createObjectStore("session", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("cards")) {
        db.createObjectStore("cards", { keyPath: "email" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
  });
};



export const salvarSessao = async (usuario) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    
    const transaction = db.transaction(["session"], "readwrite");
    const store = transaction.objectStore("session");
    const request = store.put({ id: "current", ...usuario });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao salvar sessão");
  });
};

export const getSessao = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["session"], "readonly");
    const store = transaction.objectStore("session");
    const request = store.get("current");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Erro ao buscar sessão");
  });
};

// [NOVO] Necessário para o botão "Sair" funcionar
export const limparSessao = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["session"], "readwrite");
    const store = transaction.objectStore("session");
    const request = store.delete("current");
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao limpar sessão");
  });
};

// --- USUÁRIO ---

export const buscarUsuarioPorEmail = async (email) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const request = store.get(email);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Erro ao buscar usuário");
  });
};

// --- CARTÃO ---

export const salvarCartao = async (email, dadosCartao) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readwrite");
    const store = transaction.objectStore("cards");
    const request = store.put({ email: email, ...dadosCartao });

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao salvar cartão");
  });
};

export const buscarCartao = async (email) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    const request = store.get(email);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Erro ao buscar cartão");
  });
};

// [NOVO] Necessário para o botão "Excluir Cartão" funcionar
export const removerCartao = async (email) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readwrite");
    const store = transaction.objectStore("cards");
    const request = store.delete(email); // Deleta usando o email como chave

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao excluir cartão");
  });
};

// --- UTILITÁRIOS ---

export const verificarCartaoExistente = async (email) => {
  try {
    const cartao = await buscarCartao(email);
    return !!cartao;
  } catch (err) {
    if (err) console.log(err);
    return false;
  }
};
