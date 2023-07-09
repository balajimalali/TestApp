export default function token(token) {
    let cookies = document.cookie.split('; ')
    let ans = ''
    cookies.forEach(cookie => {
        if (cookie.startsWith(token)) {
            ans = cookie.split('%20')[1]
        }
    });

    return ans;
}