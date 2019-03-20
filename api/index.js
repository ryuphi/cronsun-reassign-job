const axios = require('axios');

const options = {
  auth: {
    username: process.env.USER,
    password: process.env.PASS
  },
  baseUrl: process.env.BASE_URL
};

const api = {
  hasRuleInNode: (job, nodeId) => {
    return job.rules.filter(rule => rule.nids.includes(nodeId)).length > 0;
  },

  getNodeList: async () => {
    const response = await axios.get(`${options.baseUrl}/nodes`, {...options});

    return Array.from(response.data);
  },

  getJobsList: async () => {
    const response = await axios.get(`${options.baseUrl}/jobs`, {...options});
    return Array.from(response.data)
  },

  updateJobRule: async (job, newAvailableNodeId) => {
    await axios
      .put(
        `${options.baseUrl}/job`,
        {
          id: job.id,
          name: job.name,
          group: 'default',
          cmd: job.cmd,
          user: job.user,
          // important part xd
          rules: job.rules.map(rule => {
            return {
              id: rule.id,
              exclude_nids: rule.exclude_nids,
              gids: rule.gids,
              nids: [newAvailableNodeId],
              timer: rule.timer
            }
          }),
          pause: job.pause,
          timeout: job.timeout,
          parallels: job.parallels,
          retry: job.retry,
          interval: job.interval,
          kind: job.kind,
          avg_time: job.avg_time,
          fail_notify: job.fail_notify,
          to: job.to,
          log_expiration: job.log_expiration,
          oldGroup: job.group
        },
        {
          ...options
        }
      )
      .then(response => console.log(`Updated job "${job.name}"!`))
      .catch(error => console.log(error))
  }
}

module.exports = api;
