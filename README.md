# DList.top NodeJS client
Official [dlist.top](https://dlist.top) gateway client for NodeJS.


## Installation

`npm install dlist-top`

## Setup

To get your token please refer to the [DList.top documentation](https://github.com/dlist-top/docs/wiki/Getting-started).


## Usage

```js
const DClient = require('dlist-top');
let dlist = new DClient('YOUR DLIST TOKEN')
dlist.login();

dlist
    .on('ready', (dlist) => {
        console.log(`Logged as ${dlist.name}...`);
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
```
