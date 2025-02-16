let clients = [];

const addClient = (res) => {
  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);
  return clientId;
};

const removeClient = (clientId) => {
  clients = clients.filter(c => c.id !== clientId);
};

const sendEventToAll = (data) => {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

module.exports = {
  addClient,
  removeClient,
  sendEventToAll,
};
