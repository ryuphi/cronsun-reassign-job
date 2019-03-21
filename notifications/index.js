const emailNotification = require('./email');
const mattermostWebhook = require('./mattermost');

module.exports = {
  email: emailNotification,
  mattermost: mattermostWebhook
}
