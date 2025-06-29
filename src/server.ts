import app, { AppDataSource } from './app';
import {config} from 'dotenv';
config();


AppDataSource.initialize()
app.listen(process.env.PORT, function() {
    console.log('Server started on port ' + process.env.PORT);
});