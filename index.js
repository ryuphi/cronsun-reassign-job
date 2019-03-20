require('dotenv').config();

const EventEmitter = require('events');
const listeners = require('./notifications');

const emitter = new EventEmitter();
const api = require('./api');

const JOB_FOUND_EVENT = 'job-damaged-found';

// email notification...
emitter.addListener(JOB_FOUND_EVENT, listeners.emailNotification);

const main = async () => {
  const nodes = await api.getNodeList();
  const damagedNodes = nodes.filter(node => false === node.connected);
  const damagedNodesUuid = Array.from(damagedNodes.map(node => node.id));
  const firstAvailableNode = nodes.filter(node => true === node.connected).pop();
  const jobsList = await api.getJobsList();

  damagedNodesUuid.every(async (nodeId) => {
    console.log(`Find jobs in Damaged node '${nodeId}'`);

    // find jobs with the damaged node assigned..
    const damagedJobs = jobsList.filter(job => api.hasRuleInNode(job, nodeId));

    if (damagedJobs.length <= 0) {
      console.log(`🍺🍺🍺 Don\'t have damaged job in node '${nodeId}'!!`);
      return;
    }

    damagedJobs.every(async job => await api.updateJobRule(job, firstAvailableNode.id));
    emitter.emit(JOB_FOUND_EVENT, damagedJobs, nodeId, firstAvailableNode.id)
  });
};

main().catch(err => console.error(err));
