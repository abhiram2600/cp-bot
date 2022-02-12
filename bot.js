const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const discordToken = process.env['TOKEN'];
const Database = require("@replit/database");
const db = new Database();

const addItem = async (name, code) => {
  const result = await db.set(name, code).then(()=> true);
  return result || false;
};

const getItem = async (name) => {
  const value = await db.get(name);
  return value || '';
};

const getList = async () => {
  const list = await db.list();
  return list || [];
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (msg) => {
  if(msg.content.slice(0,5) === '{how}'){
    msg.reply(`
   \`\`\`   
    Adding data:- 
      Syntax:-
        {add}<>title<>code
      Example:-
        {add}<>add 2 numbers<>int c = a + b;
    Getting data:-
      Syntax:-
        {get}<>title
      Example:-
        {get}<>add 2 numbers
    List all titles:-
      Syntax/Example:-
        {list} \`\`\`
    `)
  }
  if(msg.content.slice(0,5) === '{add}'){
    const msgArr = msg.content.split('<>');
    const result =await addItem(msgArr[1], msgArr[2]);
    if(result)
    {
      msg.reply("😏👍");
    }
    else {
      msg.reply("DB problem 😵");
    }
  }
  if(msg.content.slice(0,5) === '{get}'){
    const result = await getItem(msg.content.split('<>')[1])
    if(result)
    {
      msg.reply(result);
    }
    else{
      msg.reply('no luck today, start searching')
    }
  }
  if(msg.content.slice(0,6) === '{list}'){
    const list = await getList();
    let result = '';
    for(let i of list ){
      result += `${i}\n`;
    }
    msg.reply(result);
  }
})



client.login(discordToken);
