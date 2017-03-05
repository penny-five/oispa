
exports.up = async knex => {
  await knex.raw('ALTER TABLE venues ADD COLUMN website_url TEXT');
};

exports.down = async knex => {
  await knex.raw('ALTER TABLE venues DROP COLUMN website_url');
};
