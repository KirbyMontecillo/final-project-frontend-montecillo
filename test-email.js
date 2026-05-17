const nodemailer = require('../node-mysql-api/node_modules/nodemailer');

async function testSMTP() {
    console.log("Testing Ethereal SMTP connection...");
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'evalyn94@ethereal.email',
            pass: 'SVpgfg72H3ZFpyqnHk'
        }
    });

    try {
        await transporter.verify();
        console.log("✅ SUCCESS! Ethereal credentials are still valid.");
    } catch (error) {
        console.error("❌ FAILED! Credentials have expired or are invalid.");
        console.error(error.message);
    }
}

testSMTP();
