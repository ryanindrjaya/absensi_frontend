import { atom } from 'recoil';

const profileAdminState = atom({
    key: 'profileAdminState',
    default: {
        user: {},
    }
});

export default profileAdminState;
