const path = require('path');

const express = require('express');
const app = express();
// bodyParser

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.listen(3000, function() {
  console.log(`ToDo List server running on port ${this.address().port}`);
});
