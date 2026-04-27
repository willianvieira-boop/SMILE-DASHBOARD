const http = require('http');

const data = JSON.stringify({
  employeeId: "emp001",
  role: "CRC",
  weeklyGoal: 25,
  actualValue: 28,
  weekNumber: 1,
  cycleMonth: "Abril"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/dashboard/performance',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Resposta do servidor:');
    console.log(JSON.parse(responseData));
  });
});

req.on('error', (error) => {
  console.error('Erro:', error);
});

req.write(data);
req.end();