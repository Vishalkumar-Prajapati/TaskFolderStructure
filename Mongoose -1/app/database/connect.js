const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task1');
    } catch (error) {
        console.log(error);
    }
}

main().then(()=>console.log('Connected')).catch(err => console.log(err));
