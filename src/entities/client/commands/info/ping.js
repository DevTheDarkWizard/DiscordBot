const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,//Tempo de espera para usar novamente
	data: new SlashCommandBuilder()
		.setName('ping')//Comando
		.setDescription('Replies with Pong!'),//Descrição do comando
	async execute(interaction) {
		//Quando usado o ephemeral, somente o usuário que enviou a mensagem pode ver
		//await interaction.deferReply({ ephemeral: true });//Comando para aparecer que o bot está operando, usado para operações demoradas
		await interaction.reply({ content: "Pong!", ephemeral: true });//Envia uma mensagem
		//await wait(2000);//Espera um tempo
		//await interaction.followUp({ content: "Pong again!", ephemeral: true });//Reply da mensagem enviada anteriormente
		//await interaction.deleteReply();//Deleta o primeiro reply
		//await interaction.editReply("Pong again!");//Edita o reply
		
		//Tradução
		//const locales = {
		//	pl: 'Witaj Świecie!',
		//	de: 'Hallo Welt!'
		//};
		//await interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
	},
};