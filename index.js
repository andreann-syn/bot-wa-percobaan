const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Whatsapp bot is ready!');
});

client.on('message', message => {
    console.log('Pesan diterima:', message.body);

    if (message.body.toLowerCase() === 'haloo') {
        message.reply('Haloo juga bang🤞');
    }
});

client.initialize();