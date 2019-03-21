const axios = require('axios');
const moment = require('moment');

require('dotenv').config();
moment.locale('es');

let notified = false;

module.exports = async function (jobs, nodeId, newNodeId) {
  const baseUrl = process.env.BASE_URL.replace('/v1', '');
  let table = jobs.map(job => `| [${job.name}](${baseUrl}/ui/#/job/edit/default/${job.id}) | ${moment(job.latestStatus.beginTime).format('LLLL')} |`)

  await axios.post(process.env.MATTERMOST_WEBHOOK_URL, {
    channel: "dev-med360",
    username: "reassign jobs - webhook",
    icon_url: "https://upload.wikimedia.org/wikipedia/en/0/00/Kubernetes_%28container_engine%29.png",
    text: `###### Revisión job Cronsun (${moment().format('LLLL')})
:rotating_light: __${jobs.length}__ job encontrado(s) en el nodo __'${nodeId}'__. Se reasignaron al nodo __'${newNodeId}'__.\n
| Job | Última ejecución |
|:------:|:----------------:| 
${table.join('\n')}
\n
Atento a comentarios :monkey::monkey::monkey:`
  });
}
