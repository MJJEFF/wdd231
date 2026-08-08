// storage.js — localStorage helpers for favorite workouts
const FAV_KEY = "vitalstart-favorites";

export function getFavorites() {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function toggleFavorite(id) {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    if (index === -1) {
        favs.push(id);
    } else {
        favs.splice(index, 1);
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return favs;
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}