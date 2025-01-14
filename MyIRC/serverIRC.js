const net = require("net");
const { buffer } = require("stream/consumers");

// Port de la socket pour le serveur
const PORT = 6667;
const tableauPseudo = new Map();

// Création du serveur, la socket ouverte par le client est en paramètre.
const server = net.createServer((socket) => {
  console.log("--- Client connecté.");
  let pseudo = null;
  socket.write ("Quel est ton pseudo ?")
  let buf = "";
  socket.on("data", (data) => {
    buf += data;
    if (buf.includes("\n")){
      const line = buf.toString().trim();
      //si il n'y pas de pseudo
      if (pseudo == null){
      pseudo = line
      tableauPseudo.set(line,socket)
      speakAll(tableauPseudo,`Nous accueillons ${buf}`)
      buf = "";
      } else {
        speakAll(tableauPseudo,`[${pseudo}]: ${buf}`)
      buf = "";
      }
      
      
    }
     
  });
    socket.on("end", () => {
        // on cherche le pseudo en fonction du socket 
      let pseudoDelete = null;
     for (const [pseudo, decoSocket] of tableauPseudo.entries()) {
        if (decoSocket === socket) {
          //j'incrémente ma variable
            pseudoDelete = pseudo;
            tableauPseudo.delete(pseudo);
        break; 
      }
    }
    if(pseudoDelete){
      for(const otherSocket of tableauPseudo.values()){
        otherSocket.write(`${pseudoDelete} nous a quitté` )
    console.log("--- Client déconnecté.");
    }
  }
});
   // Gestion des erreurs
   socket.on("error", (err) => {
    console.error(`Erreur sur le socket : ${err.message}`);

    let pseudoDelete = null;
     for (const [pseudo, decoSocket] of tableauPseudo.entries()) {
        if (decoSocket === socket) {
          //j'incrémente ma variable
            pseudoDelete = pseudo;
            tableauPseudo.delete(pseudo);
        break; 
      }
    }
    if(pseudoDelete){
      for(const otherSocket of tableauPseudo.values()){
        otherSocket.write(`${pseudoDelete} nous a quitté` )
    console.log("--- Client déconnecté.");
    }
  }
});

  });          
// Démarre le serveur sur le port 5001
server.listen(PORT, () => {
  console.log(`Serveur IRC en écoute sur le port ${PORT}`);
});

function speakAll(tableauPseudo,message){
  const listSocket = tableauPseudo.values();
  for(const socket of listSocket){
    socket.write(message)
  }

}