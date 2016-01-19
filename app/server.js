import PATH from 'path';
import FS from 'fs';

import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import HBS from 'express-handlebars';

const app = express();
const ROOT = '.';

app.use(compression({threshold: 512}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

const pageRouter = express.Router();

pageRouter.get('*', (req, res, next) => {
    console.log(req.url);
    if(req.url.indexOf('/assets') < 0) {
        req.url = '/assets/index.html';    
    }

    next();
});

app.use('/', pageRouter);

app.use('/assets', express.static(PATH.resolve(__dirname, ROOT, 'public')));

app.listen(6001, () => {
    console.log('Listening on http://localhost:6001');    
});
