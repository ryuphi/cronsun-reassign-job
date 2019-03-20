const api = require('./api');

(async () => {
  const nodes = await api.getNodeList();
  const damagedNodes = nodes.filter(node => false === node.connected);
  const damagedNodesUuid = Array.from(damagedNodes.map(node => node.id));
  const firstAvailableNode = nodes.filter(node => true === node.connected).pop();
  const jobsList = await api.getJobsList();

  damagedNodesUuid.every(async (id) => {
    console.log(`\nFind jobs in Damaged node '${id}'`);

    // find jobs with the damaged node assigned..
    const damagedJobs = jobsList.filter(job => api.hasRuleInNode(job, id));

    if (damagedJobs.length <= 0) {
      console.log(`🍺🍺🍺 Don\'t have damaged job in node '${id}'!!`);
      return;
    }

    damagedJobs.every(async job => await api.updateJobRule(job, firstAvailableNode.id));

  });
})();
