//Adiciona as configurações de ambiente
require("dotenv").config({ path: __dirname + "/../.env"});
require("colors");//Frufru

//Importa o client do discord
const client = require("./entities/client");

(async () => {
    //Liga o cliente do discord
    await client.login(client.credentials.token);
	
	//Desliga o cliente do discord
	//await client.destroy()
})();