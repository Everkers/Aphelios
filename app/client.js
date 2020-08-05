const socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl');
const chalk = require('chalk');

let username = null;
socket.on('disconnect', () => {
  socket.emit('disconnect');
});
socket.on('connect', () => {
  [, , username] = process.argv;
  console.log(chalk.red('\n=== start chatting === \n'));
  repl.start({
    prompt: `${username}:`,
    eval: (cmd) => {
      socket.send({ cmd, username });
    },
  });
});
socket.on('message', (data) => {
  console.log(chalk.black.bgGreen(`${data.username}: ${data.cmd.split('\n')[0]}`));
});
