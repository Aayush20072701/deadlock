const Redis = require('ioredis');

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      tls: process.env.REDIS_URL?.startsWith('rediss://') ? {} : undefined,
      maxRetriesPerRequest: 3,
    });
    redis.on('connect', () => console.log('✅ Redis connected'));
    redis.on('error',   (e) => console.error('❌ Redis error:', e.message));
  }
  return redis;
}

const roomKey   = (id) => `battle:room:${id}`;
const lobbyKey  = (userId) => `battle:lobby:${userId}`;
const QUEUE_KEY = 'battle:queue';

// ── Room ──────────────────────────────────────────────────────
const setRoom    = (id, state) => getRedis().set(roomKey(id), JSON.stringify(state), 'EX', 3600);
const getRoom    = async (id)  => { const d = await getRedis().get(roomKey(id)); return d ? JSON.parse(d) : null; };
const deleteRoom = (id)        => getRedis().del(roomKey(id));

// ── Queue ─────────────────────────────────────────────────────
const enqueue = (userId, socketId) =>
  getRedis().lpush(QUEUE_KEY, JSON.stringify({ userId, socketId, joinedAt: Date.now() }));

const dequeue = async (userId) => {
  const items = await getRedis().lrange(QUEUE_KEY, 0, -1);
  for (const item of items) {
    if (JSON.parse(item).userId === userId) {
      await getRedis().lrem(QUEUE_KEY, 1, item); break;
    }
  }
};

const queueLength = () => getRedis().llen(QUEUE_KEY);

const popPair = async () => {
  const r = getRedis();
  const a = await r.rpop(QUEUE_KEY);
  const b = await r.rpop(QUEUE_KEY);
  if (!a || !b) {
    if (a) await r.rpush(QUEUE_KEY, a);
    if (b) await r.rpush(QUEUE_KEY, b);
    return null;
  }
  return [JSON.parse(a), JSON.parse(b)];
};

// ── Lobby pairing (stored in Redis so restarts don't wipe it) ─
const setLobbyPair = (userId, data) =>
  getRedis().set(lobbyKey(userId), JSON.stringify(data), 'EX', 600); // 10 min TTL

const getLobbyPair = async (userId) => {
  const d = await getRedis().get(lobbyKey(userId));
  return d ? JSON.parse(d) : null;
};

const deleteLobbyPair = (userId) => getRedis().del(lobbyKey(userId));

// ── Lobby settings (stored in Redis) ─────────────────────────
const lobbySettingKey = (lobbyId, userId) => `battle:lobbyset:${lobbyId}:${userId}`;

const setLobbySettings = (lobbyId, userId, settings) =>
  getRedis().set(lobbySettingKey(lobbyId, userId), JSON.stringify(settings), 'EX', 600);

const getLobbySettings = async (lobbyId) => {
  const r = getRedis();
  const keys = await r.keys(`battle:lobbyset:${lobbyId}:*`);
  const result = {};
  for (const key of keys) {
    const userId = key.split(':').pop();
    const data = await r.get(key);
    if (data) result[userId] = JSON.parse(data);
  }
  return result;
};

const deleteLobbySettings = async (lobbyId) => {
  const r = getRedis();
  const keys = await r.keys(`battle:lobbyset:${lobbyId}:*`);
  if (keys.length) await r.del(...keys);
};

module.exports = {
  setRoom, getRoom, deleteRoom,
  enqueue, dequeue, queueLength, popPair,
  setLobbyPair, getLobbyPair, deleteLobbyPair,
  setLobbySettings, getLobbySettings, deleteLobbySettings,
};