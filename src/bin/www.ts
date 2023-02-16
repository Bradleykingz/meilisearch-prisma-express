import express from 'express';
import {productRoutes} from "../routes/Products";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/products', productRoutes.router);

app.listen(1337, () => {
  console.log('Server is running on port 1337');
})

export default app;
