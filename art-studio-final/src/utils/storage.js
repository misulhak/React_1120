export const Storage = {
    get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    
    set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
        window.dispatchEvent(new Event('storage')); 
    },
    
    getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser') || 'null')
};