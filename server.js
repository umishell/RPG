import 'dotenv/config';
import fastifyPostgres from '@fastify/postgres';
import Fastify from 'fastify'
const fastify = Fastify()

fastify.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL,
}); 

fastify.get('/', async (request, reply) => {
  reply.send('Server running');
});

// CREATE a new character
fastify.post('/characters', async (request, reply) => {
  const { name, class: charClass, weapon } = request.body;
  try {
    const client = await fastify.pg.connect();
    const result = await client.query(
      'INSERT INTO characters (name, class, weapon) VALUES ($1, $2, $3) RETURNING *',
      [name, charClass, weapon]
    );
    client.release();
    reply.send(result.rows[0]);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not create character' });
  }
});

// READ all characters
fastify.get('/characters', async (request, reply) => {
  try {
    const client = await fastify.pg.connect();
    const result = await client.query('SELECT * FROM characters');
    client.release();
    reply.send(result.rows);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not fetch characters' });
  }
});

// READ a single character by ID
fastify.get('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const client = await fastify.pg.connect();
    const result = await client.query('SELECT * FROM characters WHERE id = $1', [id]);
    client.release();
    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send(result.rows[0]);
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not fetch character' });
  }
});

// UPDATE a character by ID
fastify.put('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, class: charClass, weapon } = request.body;
  try {
    const client = await fastify.pg.connect();
    const result = await client.query(
      'UPDATE characters SET name = $1, class = $2, weapon = $3 WHERE id = $4 RETURNING *',
      [name, charClass, weapon, id]
    );
    client.release();
    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send(result.rows[0]);
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not update character' });
  }
});

// DELETE a character by ID
fastify.delete('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const client = await fastify.pg.connect();
    const result = await client.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);
    client.release();
    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send({ message: 'Character deleted' });
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not delete character' });
  }
});

// CREATE a new power
fastify.post('/powers', async (request, reply) => {
  const { name, type, damage, characterId } = request.body;

  // Validate input data (optional)

  try {
    const client = await fastify.pg.connect();
    const result = await client.query(
      'INSERT INTO powers (name, type, damage, character_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, damage, characterId]
    );
    client.release();

    reply.send(result.rows[0]);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not create power' });
  }
});

// READ all powers
fastify.get('/powers', async (request, reply) => {
  try {
    const client = await fastify.pg.connect();
    const result = await client.query('SELECT * FROM powers');
    client.release();

    reply.send(result.rows);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not fetch powers' });
  }
});

// READ a single power by ID
fastify.get('/powers/:id', async (request, reply) => {
  const { id } = request.params;

  try {
    const client = await fastify.pg.connect();
    const result = await client.query('SELECT * FROM powers WHERE id = $1', [id]);
    client.release();

    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send(result.rows[0]);
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not fetch power' });
  }
});

// UPDATE a power by ID
fastify.put('/powers/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, type, damage, characterId } = request.body;

  try {
    const client = await fastify.pg.connect();
    const result = await client.query(
      'UPDATE powers SET name = $1, type = $2, damage = $3, character_id = $4 WHERE id = $5 RETURNING *',
      [name, type, damage, characterId, id]
    );
    client.release();

    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send(result.rows[0]);
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not update power' });
  }
});

// DELETE a power by ID
fastify.delete('/powers/:id', async (request, reply) => {
  const { id } = request.params;

  try {
    const client = await fastify.pg.connect();
    const result = await client.query('DELETE FROM powers WHERE id = $1 RETURNING *', [id]);
    client.release();

    if (result.rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send({ message: 'Power deleted' });
    }
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Could not delete power' });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();