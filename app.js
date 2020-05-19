const TelegramBot = require('node-telegram-bot-api');
const userInfo = require('./config/userinfo')
const bot = new TelegramBot(userInfo.botToken, {polling: true});

const mongoose = require('mongoose');
const mongoDB = userInfo.mongodbUrl;
const db = mongoose.connect(mongoDB)
  .then(()=>console.log('数据库已连接'))
  .catch(err=>console.log(err))

const PicsModel = require('./Model/Pics');


bot.onText(/\/givemepics/,(msg)=>{
  let pics;
  PicsModel.find()
  .then(allPics=>{
    if(allPics.length == 0){
      bot.sendMessage(msg.chat.id, '图库里貌似还没有猫片儿');
    }else{
      pics = allPics.length;
      bot.sendMessage(msg.chat.id, '奴才在！😽o(=•ェ•=)');
      bot.sendPhoto(msg.chat.id, allPics[Math.floor(Math.random()*pics)].url);
    }
})
})

bot.onText(/\/count/,msg=>{
  PicsModel.find()
  .then(countPics=>{
    bot.sendMessage(msg.chat.id, '现在图库共有'+countPics.length+'张照片');
  })
})

bot.onText(/\/lately/,(msg)=>{
  PicsModel.find().limit(3).sort({ date: -1})
  .then(latelyPics=>{
    console.log(latelyPics)
    latelyPics.forEach(latelyPic=>{
      bot.sendPhoto(msg.chat.id, latelyPic.url);
    })
  })
})

bot.on('photo',msg=>{
  // console.log(msg.photo[0].file_unique_id)
  if(msg.from.id == 581117238){
    PicsModel.findOne({uniUrl:msg.photo[0].file_unique_id})
    .then(resultPic=>{
      // console.log(resultPic)
      if(!resultPic){
        const pics = new PicsModel({
          url:msg.photo[0].file_id,
          uniUrl:msg.photo[0].file_unique_id,
          date:msg.date
        });
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
    // console.log(msg.reply_to_message.photo[0].file_unique_id)
    PicsModel.findOne({uniUrl:msg.reply_to_message.photo[0].file_unique_id})
    .then(delPic=>{
      // console.log(delPic)
      PicsModel.remove(delPic)
      .then(()=>{
        bot.sendMessage(msg.chat.id, '皂片已删除',{reply_to_message_id:msg.message_id});
      })
    })
  }else{
    bot.sendMessage(msg.chat.id, '删除命令只可阿猪回复使用',{reply_to_message_id:msg.message_id});
  }
})

bot.onText(/\/start/,msg=>{
  bot.sendMessage(msg.chat.id, '试试下面的斜杠命令，比如说 /givemepics 来获取一些猫片儿');
})


