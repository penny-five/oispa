exports.up = async knex => {
  await knex.schema.createTableIfNotExists('beerstyles', table => {
    table.integer('id').primary();
    table.text('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
  await knex.schema.createTableIfNotExists('venues', table => {
    table.integer('id').primary();
    table.text('name').notNullable();
    table.text('address');
    table.float('lat');
    table.float('lng');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
  await knex.schema.createTableIfNotExists('beers', table => {
    table.integer('id').primary();
    table.text('name').notNullable();
    table.text('description');
    table.text('brewery');
    table.text('country');
    table.float('abv');
    table.float('rating');
    table.datetime('rating_updated_at');
    table.integer('beerstyle_id').references('id').inTable('beerstyles');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
  await knex.schema.createTableIfNotExists('checkins', table => {
    table.integer('id').primary();
    table.integer('beer_id').notNullable().references('id').inTable('beers').onDelete('CASCADE');
    table.integer('venue_id').notNullable().references('id').inTable('venues').onDelete('CASCADE');
    table.dateTime('checkin_time').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('checkins');
  await knex.schema.dropTableIfExists('beers');
  await knex.schema.dropTableIfExists('venues');
  await knex.schema.dropTableIfExists('beerstyles');
};
