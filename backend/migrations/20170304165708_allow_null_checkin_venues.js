
exports.up = async knex => {
  /* Apparently checkins can be done without setting a venue */
  await knex.raw('ALTER TABLE checkins ALTER COLUMN venue_id DROP NOT NULL');
};

exports.down = async knex => {
  await knex.raw('ALTER TABLE checkins ALTER COLUMN venue_id SET NOT NULL');
};
