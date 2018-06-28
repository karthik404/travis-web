import Controller from '@ember/controller';
import { service } from 'ember-decorators/service';
import { computed, action } from 'ember-decorators/object';
import { alias, not, or } from 'ember-decorators/object/computed';
import config from 'travis/config/environment';

export default Controller.extend({
  @service auth: null,
  @service externalLinks: null,
  @service features: null,

  config,

  @alias('auth.currentUser') user: null,

  @action
  sync() {
    return this.get('user').sync();
  },

  @action
  toggle(hook) {
    return hook.toggle();
  },

  @computed('model.{name,login}')
  accountName(name, login) {
    return name || login;
  },

  @computed('features.enterpriseVersion', 'config.billingEndpoint')
  checkSubscriptionStatus(enterprise, billingEndpoint) {
    return !enterprise && !!billingEndpoint;
  },

  @computed('model.subscription.isSubscribed', 'model.education')
  isSubscribed(isSubscribed, education) {
    return isSubscribed || education;
  },

  @not('isSubscribed') isNotSubscribed: null,

  @or('model.subscription.billingUrl', 'model.billingUrl')
  billingUrl: null,
});
