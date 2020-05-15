const TelegramBot = require('node-telegram-bot-api');
const token = '1126432569:AAHVID4EzPr6_95gr9AVyll_iy6kJ3Iquec'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/add (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // “ msg”是从电报收到的消息
  // 'match' is the result of executing the regexp above on the text content of the message
  // “匹配”是对消息的文本内容执行上述正则表达式的结果

  const chatId = msg.chat.id;
  const url = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, url);
});




bot.onText(/\/givemephoto/,(msg,match)=>{
    const chatId = msg.chat.id;
    const pic = [
        'https://wx3.sinaimg.cn/mw690/007s1STCly1ger86b6v60j30u0140qv5.jpg',
        'https://wx1.sinaimg.cn/mw690/007s1STCly1ger869tpe1j31400u0npd.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1ger8687nmqj31400u04qp.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1ger866wp9fj30u0140x6p.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geps16e122j31020r2juk.jpg',        
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoydea371j30u00u07il.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoyp2ajvmj30u0140x6p.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoyp31oe5j30u0140k2e.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoyp412trj31400u0u0x.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1geoyp4zfpoj30u01407wh.jpg',
        'https://wx1.sinaimg.cn/mw690/007s1STCly1geoyp6525kj30u0140u0x.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoyp6gotij30u01hck3r.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoyp7u0jbj30u00u04qp.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoyp8xeh1j31400u0k48.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoypak91kj30u01407wi.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1geoypbnua5j30u00u0kjl.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1geoypcqc91j31400u0x6p.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoypdrvzfj30u0140kjl.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoypeoeq6j30u01404qp.jpg',
        'https://wx1.sinaimg.cn/mw690/007s1STCly1geoypfa89tj30u00u07ku.jpg',
        'https://wx4.sinaimg.cn/mw690/007s1STCly1geoypgi1m4j30u00u0aid.jpg',
        'https://wx1.sinaimg.cn/mw690/007s1STCly1geoypipd78j30u00u0txr.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoypjup1sj30u00u0e81.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1geoyphtkpxj30u0140qv7.jpg',
        'https://wx1.sinaimg.cn/mw690/007s1STCly1gerd1upp8xj30u00u04qp.jpg',
        'https://wx2.sinaimg.cn/mw690/007s1STCly1gerd1w36ytj30u00u0b2a.jpg',
        'https://wx3.sinaimg.cn/mw690/007s1STCly1gerd1wufelj30u00u0axs.jpg',
        
];
    let z = pic.length;
    bot.sendPhoto(chatId,pic[Math.floor(Math.random()*z)]);
})
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, '奴才在！😽o(=•ェ•=)');
});
