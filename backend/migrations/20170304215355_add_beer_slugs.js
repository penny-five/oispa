
exports.up = async knex => {
  await knex.raw('ALTER TABLE beers ADD COLUMN slug TEXT');
};

exports.down = async knex => {
  await knex.raw('ALTER TABLE beers DROP COLUMN slug');
};
