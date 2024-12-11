import express from 'express';
import secretSantaRoutes from './src/routes/secretSantaRoutes.js';
import serveStatic from 'serve-static';

const app = express();
const port = 3000;

app.use('/assign', secretSantaRoutes);  
app.use(serveStatic("../frontend/secret-santa/dist"));

// Pokreni server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
