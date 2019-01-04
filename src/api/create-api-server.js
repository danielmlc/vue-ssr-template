import LRU from 'lru-cache';
import websiteConfig from '../config/website';
export function createAPI() {
    let api = {};
    api.onServer = true;
    api.cachedItems = LRU({
        max: 1000,
        maxAge: 1000 * 60 * 2 // 2 min cache
    });

    api.url = websiteConfig.host + websiteConfig.path;
    return api;
}