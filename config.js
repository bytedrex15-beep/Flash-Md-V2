require('dotenv').config();

function mapPresence(val) {
    const mapping = {
        typing: 'composing',
        online: 'available',
        recording: 'recording',
        paused: 'paused',
        offline: 'unavailable'
    };
    return mapping[val?.toLowerCase()?.trim()] || 'paused';
}

module.exports = {
    prefixes: process.env.PREFIX
        ? process.env.PREFIX.split(',').map(p => p.trim())
        : [''],

    NUMBER: process.env.YOUR_NUMBER || '255743140476',
    MODE: (process.env.MODE || 'private').toLowerCase().trim(),
    WARN_LIMIT: process.env.WARNINGS || '3',
    ON: process.env.YOUR_NAME || 'FLASH-MD',
    ANTICALL: process.env.ANTICALL || 'off',
    ADM: process.env.ANTIDELETE || 'off',
    AR: process.env.AUTO_REACTION || 'off',

    AUTO_VIEW_STATUS: process.env.AUTO_READ_STATUS === 'on',
    AUTO_LIKE: process.env.AUTO_LIKE === 'on',
    AUTO_READ_MESSAGES: process.env.AUTO_READ_DM === 'off',
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    sessionBase64: process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib002QlNDbnJEWmkxdDhoOVpBb3I0QzlpWU9UZ0tZSHR3WXY1OGk5K0JXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU9JYk5zcmZ4cDJKSjhEOW83ZjhwN2JkcGNtS2IyTjhNeFRmcW1FbzFRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Q0tJWmtOSkYvb0gyQklET1hycnl2dmI5MC9GWitmSTM4Wjcrc3M3Wm5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvb1I1cHBSNklxVjR1VUpIZnY4c1NmY3Jyd01pcEhMcmNKM0U2c1R5RmpzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJQTW16c0xCWjJOSW0vV0tyV2V3TE90REZlQnd2L3NNUUowTDBqd3BuVjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFFaWRCRGlPOGV3OXJpQjk2QnZtR0ZEODdmTHhCcGZuN1phYTE2WHQ1akU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUVzTElnaU40ZmE1MjdqZ3MrenJSOHZ6QS9CM0lqcXFQUjJrVDFTb29WYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejNFc3FncUtwQVVVOUVNZEh2RlIwN0htZFJ6VVEvbXBVY2RXQ1oyNUpVND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InljOGN6bDRsTFlYalkvakc1R2RvVnNVM0ZEaTBaTnJDV3dSNlBzYjVGcDEza2s5MEFPK0pJYWFTeWhpWm44UExNeDJoQTJWWS9USUN2ZUZIa0lTQ0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJKK1J4RExtdGNSWWltVUdRUGZnM3Y4NzRCYjFLWEtoaVFzVXBpNUFhaTJZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJQUlpLVkQyMiIsIm1lIjp7ImlkIjoiMjU1NzQzMTQwNDc2OjQ3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkJ5dGUweEZGIiwibGlkIjoiMjA3NTM3NjE4MDMwNjYyOjQ3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUENUd1BrR0VMMlhtczBHR0NrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWlZCRi9vTjl1NktWeCsvakN5RjQxbkVPWFJWK0o5dUduRk5CUVVPLzZVcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidkhzVlJtNVRDeVNBRUMydTBIOXpTcE1VcmZubkdJVjFaYnVPNW5PdlVjV20xZDRHQjlCc0pPR3VzcDhCNUhVYWJnSW9nemJsVXhlaERBamdYVUp5QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkRZODd3dU1neGptRUZCV0lTbTZXQ3Q2WTYzQnJLMlNsQWRHYjN4SXdKTlFiNHFoMDNDU1pLT0NJbm9GTnRUWHlaaXJiM3g4NGExYk8xcmtDQVVxRkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzQzMTQwNDc2OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldWUVJmNkRmYnVpbGNmdjR3c2hlTlp4RGwwVmZpZmJocHhUUVVGRHYrbEwifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlEUWdJIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3MjUyMjQzNCwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFWDEifQ==',
    timezone: 'Africa/Nairobi',

    USER_LID: process.env.YOUR_LID, 

    PRESENCE_DM: mapPresence(process.env.PRESENCE_DM || 'typing'),
    PRESENCE_GROUP: mapPresence(process.env.PRESENCE_GROUP || 'recording'),

    mapPresence
};
