
exports.up = async knex => {
  await knex.schema.table('venues', table => {
    table.text('city');
  });
  await knex('venues').where('address', '').update('address', null);
  await knex('venues').whereNotNull('address').update({ city: 'Tampere' });

  await knex.schema.table('checkins', table => {
    table.text('oispa_area');
  });
  await knex('checkins').update('oispa_area', 'tre');
  await knex.raw('ALTER TABLE checkins ALTER COLUMN oispa_area SET NOT NULL');
};

exports.down = async knex => {
  await knex('venues').where('address', null).update('address', '');
  await knex.schema.table('venues', table => {
    table.dropColumn('city');
  });

  await knex.schema.table('checkins', table => {
    table.dropColumn('oispa_area');
  });
};
