export default function authHeader() {
    const user = JSON.parse(localStore.getItem("user"));

    if (user && user.accessToken) {
        return { "x-auth-token": user.accessToken };
    }
    else {
        return {};
    }
}