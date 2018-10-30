const knex = require('knex');
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development);

module.exports = {
    getNotes: function(id) {
      if (id) {
        const promises = [db('notes'), this.getTags(id)];

        getTags: function(id) {
            return db('notes')
              .select('tags.tag')
              .join('tags', 'tags.noteId', 'notes.id')
              .where('notes.id', id);
          }