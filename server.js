const net = require("net");

// Port de la socket pour le serveur
const PORT = 5001;

// Création du serveur, la socket ouverte par le client est en paramètre.
const server = net.createServer((socket) => {
  console.log("--- Client connecté.");
  // Écouter les requêtes RPC du client
  socket.on("data", (data) => {
    //console.log(`donnée reçu"${data}`)
    const name = JSON.parse(data);
    
    if (name.request == "echo"){
       
        const res = JSON.stringify(name.params.text)
    
        socket.write(res);
    }
   
  });
  socket.on("end", () => {
    console.log("--- Client déconnecté.");
  });
});

// Démarre le serveur sur le port 5001
server.listen(PORT, () => {
  console.log(`Serveur RPC en écoute sur le port ${PORT}`);
});
