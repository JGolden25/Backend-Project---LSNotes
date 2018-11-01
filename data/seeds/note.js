exports.seed = function(knex, Promise) {
    return knex('notes')
      .del()
      .then(function() {
        return knex('notes').insert([
          { id: 1, title: 'A Note!', content: 'Hello from Noteland' }
        ]);
      });
  };
