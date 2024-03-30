// import { BroadcastChannel } from 'broadcast-channel';

const localUser = {

    get() {
        if (typeof window === "undefined") return null;
        const storage = window.localStorage.getItem('user-absensi');
        if (storage) {
            const user = JSON.parse(storage);
            return user ?? {};
        }

        return {};
    },
    getToken() {
        const user = this.get();
        return user?.token ?? null;
    },
    save(user: any) {
        return localStorage.setItem('user-absensi', JSON.stringify(user));
    },
    remove() {
        localStorage.removeItem('user-absensi');

        // const channel = new BroadcastChannel('userAccess');
        // channel.postMessage('logout');

        return Promise.resolve(true);
    }
}

export default localUser;