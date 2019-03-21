const mailer = require('nodemailer');

require('dotenv').config();

let notified = false;

module.exports = async function (jobs, nodeId, newNodeId) {
  if (false === notified && !!process.env.EMAIL_NOTIFICATION) {
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Soporte" <no-reply@support.cl>', // sender address
      to: process.env.TO_EMAIL_NOTIFICATION, // list of receivers
      subject: "Reasignación de Nodos cronsun", // Subject line
      text: "Se encontró un nodo dañado y se realizó la asignación", // plain text body
      html: `<p>Se encontraron los siguientes jobs en el nodo "${nodeId}":</p>
      <ol>
          ${jobs.map(job => `<b><li>${job.name} / Última ejecución ${job.latestStatus.beginTime}</li></b>`).join('')}
      </ol>
      Fueron asignados al nuevo nodo "${newNodeId}"</p>` // html body
    };

    // create reusable transporter object using the default SMTP transport
    let transporter = await mailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    let info = await transporter.sendMail(mailOptions);
    notified = true;
  }
}
