const { Client } = require('../build');
const client = new Client('TOKEN_GOES_HERE');

client
    .on('ready', (client) => {
        console.log(`Logged as ${client.name}...`);
    })
    .on('vote', (vote, entity) => {
        console.log(`${vote.authorID} voted for ${entity.name} - Total votes: ${vote.totalVotes}`);
    })
    .on('rate', (rate, entity) => {
        console.log(`${rate.authorID} rated ${entity.name}. Stars: ${rate.rating}/5, Comment: ${rate.details}`);
    })
    .on('disconnect', (reason, reconnectTime) => {
        console.log(`Disconnected with reason: ${reason}, attempt to reconnect in ${reconnectTime}ms.`);
    });

client.login();
