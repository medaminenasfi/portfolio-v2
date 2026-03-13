const { spawn } = require('child_process');
const path = require('path');

// Start the server
const server = spawn('node', ['dist/main.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});
