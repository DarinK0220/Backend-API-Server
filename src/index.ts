import http from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import oidcConfig from "./oidc/config";
import { auth } from 'express-openid-connect';
import * as swaggerDocument from "./doc/swagger.json";





const app = express();



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Apply authentication mechanism using OIDC
// app.use(auth(oidcConfig));

app.use(express.json());




//get ID token from OIDC
app.get('/protected', (req, res) => {
  const idToken = req.oidc.idToken;
  console.log({ 'id_token:': idToken })
  res.send({ 'id_token:': idToken });
});





app.use(userRoutes);
app.use(postRoutes);

//Server
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running API document on http://localhost:${PORT}/api-docs`));
