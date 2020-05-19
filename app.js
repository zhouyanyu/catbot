const TelegramBot = require('node-telegram-bot-api');
const token = '1224803411:AAGWXbhrTg2LzIAALuR6GvxndhCma6OIkZY'
// const token = '1211293764:AAGtGYuSHRnj0HiKg27ZN4j6q0rjjLpxhZg'
const bot = new TelegramBot(token, {polling: true});

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/catbot';
const db = mongoose.connect(mongoDB)
  .then(()=>console.log('数据库已连接'))
  .catch(err=>console.log(err))

const PicsModel = require('./Model/Pics');


bot.onText(/\/givemepics/,(msg)=>{
  let pics;
  PicsModel.find()
  .then(allPics=>{
    pics = allPics
    let z = pics.length;
    console.log(pics[Math.floor(Math.random()*z)].uniUrl)
    bot.sendPhoto(msg.chat.id, pics[Math.floor(Math.random()*z)].url);
})

    bot.sendMessage(msg.chat.id, '奴才在！😽o(=•ェ•=)');
})


bot.on('photo',msg=>{
  console.log(msg.photo[0].file_unique_id)
  if(msg.from.id == 581117238){
    PicsModel.findOne({uniUrl:msg.photo[0].file_unique_id})
    .then(resultPic=>{
      console.log(resultPic)
      if(!resultPic){
        const pics = new PicsModel({url:msg.photo[0].file_id,uniUrl:msg.photo[0].file_unique_id});
        pics.save(err=>{
          if(err){
            return handleError(err)
          }
        })
        bot.sendMessage(msg.chat.id, '皂片已添加',{reply_to_message_id:msg.message_id});
      }else{
        bot.sendMessage(msg.chat.id, '皂片不是添加过了吗',{reply_to_message_id:msg.message_id});
      }
    })
 
  }else if(msg.from.id != 581117238){
    bot.sendMessage(msg.chat.id, '只有阿猪可以添加猫片');
  }
})

bot.onText(/\/del/,msg=>{
  if(msg.reply_to_message && msg.from.id == 581117238){
    console.log(msg.reply_to_message.photo[0].file_unique_id)
    PicsModel.findOne({uniUrl:msg.reply_to_message.photo[0].file_unique_id})
    .then(delPic=>{
      console.log(delPic)
      PicsModel.remove(delPic)
      .then(()=>{
        bot.sendMessage(msg.chat.id, '皂片已删除',{reply_to_message_id:msg.message_id});
      })
    })
  }else{
    bot.sendMessage(msg.chat.id, '删除命令只可阿猪回复使用',{reply_to_message_id:msg.message_id});
  }
})

// bot.on('message',msg=>{
//   if(msg.reply_to_message && msg.from.id == 581117238){
//     bot.onText(/\/del/,msg=>{
//       console.log(msg.reply_to_message.photo[0].file_id)
//       PicsModel.findOne({url:msg.reply_to_message.photo[0].file_id})
//       .then(delPic=>{
//         console.log(delPic)
//         // PicsModel.remove(delPic)
//         // .then(()=>{
//         //   bot.sendMessage(msg.chat.id, '皂片已删除',{reply_to_message_id:msg.message_id});
//         // })
//       })
//     })
//   }
// })


