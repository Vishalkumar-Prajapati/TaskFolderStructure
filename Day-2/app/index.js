const express=require('express');
const router=require('./router/index');
const app= express();

app.use('/',router);

app.listen(3000,(err) => {
    if(err)throw new Error(err);
    console.log('listening on port 3000');
});

