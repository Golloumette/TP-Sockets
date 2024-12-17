const net = require("net");

const PORT = 5001;
const data2 = {
    "request": "echo",
    "params": {
    	"text": "This is a test."
    }
};
const jsonData = JSON.stringify(data2);
// Connexion au serveur
const client = net.createConnection(PORT, "localhost", () => {
  console.log("--- Connecté au serveur.");

  // Requête pour appeler le serveur avec votre nom.
  client.write(jsonData);
});

// Réception des réponses du serveur RPC
client.on("data", (data) => {
  const response = JSON.parse(data);

  console.log(response);
  client.end(); // Terminer la connexion après la réponse
});

client.on("end", () => {
  console.log("--- Déconnecté du serveur.");
});
