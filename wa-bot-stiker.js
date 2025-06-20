const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios'); 

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Whatsapp bot is ready!');
});

client.on('message', async (message) => {
    const text = message.body.toLowerCase();

    // Ignore if not using command (!)
    if (!text.startsWith('!')) return;

    // !haloo
    if (text === '!haloo') {
        return message.reply('Haloo bang ada yang bisa saya bantu?😉');
    }
    
    // !menu
    if (text === '!menu') {
        return message.reply('Menu:\n- !haloo\n- !stiker (kirim gambar)\n- !siapakahaku');
    }

    // !stiker
    if (text === '!stiker' && message.hasMedia) {
        const media = await message.downloadMedia();
        if (media && media.mimetype.startsWith('image/')) {
            return message.reply(new MessageMedia(media.mimetype, media.data, 'stiker.png'), undefined, {
                sendMediaAsSticker: true
            });
        } else {
            return message.reply('Media yang dikirim bukan gambar.');
        }
    }
});

client.initialize();
