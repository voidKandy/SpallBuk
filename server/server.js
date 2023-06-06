const express =  require('express');
const Router = require('./routes/Router.ts')
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.listen(8000, () => {
  console.log("Server started on port 8000");
})

new Router(app);

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next()
  } else {
    res.redirect('/')
  }
}

