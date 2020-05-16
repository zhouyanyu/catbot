const TelegramBot = require('node-telegram-bot-api');
// const token = '1126432569:AAHVID4EzPr6_95gr9AVyll_iy6kJ3Iquec'
const token = '1211293764:AAGtGYuSHRnj0HiKg27ZN4j6q0rjjLpxhZg'
const bot = new TelegramBot(token, {polling: true});

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/catbot';
const db = mongoose.connect(mongoDB)
  .then(()=>console.log('数据库已连接'))
  .catch(err=>console.log(err))

const PicsModel = require('./Model/Pics');

bot.onText(/\/addpic (.+)/, (msg, match) => {

  const url = match[1]; // the captured "whatever"
  console.log(url)
  const pics = new PicsModel({url:url});
  pics.save(err=>{
    if(err){
      return handleError(err)
    }
  })
  bot.sendMessage(msg.chat.id, url+' 已添加');
});




bot.onText(/\/givemepics/,(msg)=>{
  let pics;
  PicsModel.find()
  .then(allPics=>{
    pics = allPics
    let z = pics.length;
    console.log(pics[Math.floor(Math.random()*z)].url)
    bot.sendPhoto(msg.chat.id, pics[Math.floor(Math.random()*z)].url);
})

    bot.sendMessage(msg.chat.id, '奴才在！😽o(=•ェ•=)');
})
// bot.on(/\/add/,msg=>{

// })
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message

// });
