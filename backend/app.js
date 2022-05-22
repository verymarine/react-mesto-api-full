require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://verymarine.domain.nomoredomains.xyz',
  'http://verymarine.domain.nomoredomains.xyz',
  'https://api.verymarine.domain.nomoreparties.sbs',
  'http://api.verymarine.domain.nomoreparties.sbs',
  'localhost:3000',
];

// вызов нашего модуля
const app = express();
// переменная окружения
const { PORT = 3000 } = process.env;

// const { PORT = 3000 } = process.env;
// app.use(cors({
//   origin: 'https://verymarine.domain.nomoredomains.xyz',
//   credentials: true,
// }));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(cookieParser());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', 'https://verymarine.domain.nomoredomains.xyz');
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Credentials', true);
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   return next();
// };

// app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      /https?:\/\/(www\.)?[-\w@:%\\.\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\.\\+~#=//?&]*)/i,
    ),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', auth, (req, res, next) => {
  next(new NotFound('Страницы не существует'));
  // res.status(403).send({ message: 'Страницы не существует' });
});

app.use(errorLogger);

app.use(errors());

// app.use((req, res, next) => {
//   next(new NotFound('Страницы не существует'));
//   // res.status(404).send({ message: 'Страницы не существует' });
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`server listen port ${PORT}`);
});
