const express = require('express');
const app = express();
const port = 80;

let ledStatus = "on"; // Status default LED

// Middleware untuk parsing request body JSON
app.use(express.json());

// Endpoint untuk mengupdate status berdasarkan perintah dari bot
app.post('/update-status', (req, res) => {
    const { action } = req.body; // Dapatkan perintah dari bot

    if (!action) {
        return res.status(400).json({ message: 'Aksi tidak diberikan.' });
    }

    if (action === 'nyala') {
        ledStatus = "on"; // Ubah status LED jadi nyala
        console.log("Status LED: nyala");
        return res.status(200).json({ message: 'LED status: nyala' });
    } else if (action === 'mati') {
        ledStatus = "off"; // Ubah status LED jadi mati
        console.log("Status LED: mati");
        return res.status(200).json({ message: 'LED status: mati' });
    } else {
        return res.status(400).json({ message: 'Aksi tidak dikenali.' });
    }
});

// Endpoint untuk ESP mengecek status LED
app.get('/get-status', (req, res) => {
    res.status(200).json({ status: ledStatus }); // Kembalikan status LED saat ini
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
