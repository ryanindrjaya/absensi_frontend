import Http from "@absensi/utils/fetch"

const authService = {
    login(email: string, password: string) {
        return Http.post('auth/login', {
            email: email,
            password: password
        })
    }
}

export default authService;