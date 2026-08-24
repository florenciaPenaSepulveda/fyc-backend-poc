require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());

// Conexión a Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Ruta para probar que lee la base de datos
app.get('/api/probar-conexion', async (req, res) => {
    console.log("Haciendo petición a Supabase...");
    const { data, error } = await supabase.from('test_conexion').select('*');
    
    if (error) {
        console.error("Error de Supabase:", error);
        return res.status(500).json({ error: error.message });
    }
    
    res.json(data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend corriendo perfecto en el puerto ${PORT} 🚀`));