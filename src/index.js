const app = require('./app')

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Application up on port ${port}`);
});