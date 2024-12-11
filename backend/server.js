import Fastify from 'fastify'
import fp from '@fastify/postgres';
import 'dotenv/config';
import cors from '@fastify/cors';

const fast = Fastify()
/*
const path = require('path')

fast.register(require('@fastify/static'), {
  root: path.join(__dirname, 'frontend'),
  index: 'index.html',
});
*/

fast.register(cors, {
  origin: '*', // Allow all origins (restrict in production)
});


fast.register(fp, {
  connectionString: process.env.DATABASE_URL,
}); 

fast.get('/', async (request, reply) => {
  reply.send('Server running');
});

// CREATE a new character
fast.post('/characters', async (request, reply) => {
  const { name, class: charClass, weapon } = request.body;
  try {
    
    const { rows } = await fast.pg.query(
      'INSERT INTO characters (name, class, weapon) VALUES ($1, $2, $3) RETURNING *',
      [name, charClass, weapon]
    );
    
    reply.send(rows);
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not create character' });
  }
});

// READ all characters
fast.get('/characters', async (request, reply) => {
  try {
    
    const { rows } = await fast.pg.query('SELECT * FROM characters');
    
    reply.send(rows);
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not fetch characters' });
  }
});

// READ a single character by ID
fast.get('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    
    const { rows } = await fast.pg.query('SELECT * FROM characters WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send(rows[0]);
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not fetch character' });
  }
});

// UPDATE a character by ID
fast.put('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, class: charClass, weapon } = request.body;
  try {
    
    const { rows } = await fast.pg.query(
      'UPDATE characters SET name = $1, class = $2, weapon = $3 WHERE id = $4 RETURNING *',
      [name, charClass, weapon, id]
    );
    
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send(rows[0]);
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not update character' });
  }
});

// DELETE a character by ID
fast.delete('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const { rows } = await fast.pg.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);
    
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Character not found' });
    } else {
      reply.send({ message: 'Character deleted' });
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not delete character' });
  }
});

// CREATE a new power
fast.post('/powers', async (request, reply) => {
  const { name, type, damage, characterId } = request.body;

  // Validate input data (optional)

  try {
    
    const { rows } = await fast.pg.query(
      'INSERT INTO powers (name, type, damage, character_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, damage, characterId]
    );
    

    reply.send(rows[0]);
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not create power' });
  }
});

// READ all powers
fast.get('/powers', async (request, reply) => {
  try {
    
    const { rows } = await fast.pg.query('SELECT * FROM powers');
    

    reply.send(rows);
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not fetch powers' });
  }
});

// READ a single power by ID
fast.get('/powers/:id', async (request, reply) => {
  const { id } = request.params;

  try {
    
    const { rows } = await fast.pg.query('SELECT * FROM powers WHERE id = $1', [id]);
    

    if (rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send(rows[0]);
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not fetch power' });
  }
});

// UPDATE a power by ID
fast.put('/powers/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, type, damage, characterId } = request.body;

  try {
    
    const { rows } = await fast.pg.query(
      'UPDATE powers SET name = $1, type = $2, damage = $3, character_id = $4 WHERE id = $5 RETURNING *',
      [name, type, damage, characterId, id]
    );
    

    if (rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send(rows[0]);
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not update power' });
  }
});

// DELETE a power by ID
fast.delete('/powers/:id', async (request, reply) => {
  const { id } = request.params;

  try {
    
    const { rows } = await fast.pg.query('DELETE FROM powers WHERE id = $1 RETURNING *', [id]);
    

    if (rows.length === 0) {
      reply.status(404).send({ error: 'Power not found' });
    } else {
      reply.send({ message: 'Power deleted' });
    }
  } catch (err) {
    fast.log.error(err);
    reply.status(500).send({ error: 'Could not delete power' });
  }
});

// Start the server
const start = async () => {
  try {
    await fast.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fast.log.error(err);
    process.exit(1);
  }
};

start();