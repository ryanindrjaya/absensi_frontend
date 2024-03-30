// import { firstTimeLoginService, profileService } from "@/services";
// import { profileCompanyState, profileState } from "@/states";
// import { localUser } from "";
import profileAdminState from "@absensi/states/profileAdmin";
import { localUser } from "@absensi/utils";
import { useRecoilState } from "recoil";

const useLoggedUser = () => {
    const [userProfile, setUserProfile] = useRecoilState(profileAdminState);

    const isLogged = () => {
        return !!localUser.getToken();
    };

    const getAuthorize = () => {
        return localUser.get()?.['authorize'] ?? 'teacher';
    };

    const getName = () => {
        return localUser.get()?.['name'] ?? 'Administrator';
    };

    const getToken = () => {
        return localUser.getToken() ?? null;
    };

    const saveUserProfile = (profile: any) => {
        return new Promise((resolve) => {
            const user = {
                ...userProfile.user,
                ...profile
            };

            localUser.save(user);

            setUserProfile({
                user: {
                    ...user
                }
            });

            resolve(user);
        })
    };

    return {
        isLogged,
        getAuthorize,
        getToken,
        getName,
        saveUserProfile
    };
};

export default useLoggedUser;