import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache items for 1 hour

export default cache;