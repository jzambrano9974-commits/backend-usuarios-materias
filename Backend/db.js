import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

// --- AGREGA ESTO PARA DIAGNOSTICAR EL ERROR ---
console.log("🔍 --- DIAGNÓSTICO DE CONEXIÓN ---");

// 1. Verificamos si la variable existe
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR CRÍTICO: La variable DATABASE_URL está indefinida (undefined).");
  console.error("👉 Ve a Render > Dashboard > Tu Servicio > Environment y asegúrate de que la 'Key' se llame exactamente DATABASE_URL");
} else {
  // 2. Verificamos que tenga contenido (ocultando la contraseña por seguridad)
  const urlSegura = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
  console.log("✅ DATABASE_URL detectada:", urlSegura);
  
  // 3. Verificamos si hay espacios en blanco (error común al copiar/pegar)
  if (process.env.DATABASE_URL.trim() !== process.env.DATABASE_URL) {
    console.warn("⚠️ ALERTA: La URL tiene espacios en blanco al inicio o al final. Esto causa errores.");
  }
}
console.log("-------------------------------------");
// ----------------------------------------------

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});