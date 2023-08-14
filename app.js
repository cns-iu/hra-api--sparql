import express from 'express';
import qs from 'qs';
import v1Routes from './routes/v1/index.js';

const app = express();

app.use(express.json());

app.set('query parser', function (str) {
  return qs.parse(str, { allowDots: true });
});

app.use('/v1', v1Routes);
app.get('/foo', (req, res) => res.send('bar'));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000/`);
});


export default app;
