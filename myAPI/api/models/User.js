/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
          name: {
              type: 'text',
              required: true
          },
          email: {
              type: 'email',
              required: true
          },
          age: {
              type: 'integer',
  	min: 18,
  	max: 100
          },
          vip: {
              type: 'boolean',
              defaultsTo: false,
              required: true
          },
          isEnabled: {
              type: 'boolean',
              required: true,
              defaultsTo: true
          }
  }
};
