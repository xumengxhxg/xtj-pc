import Base64 from 'compact-base64'

export function authEncode({username, password}) {
    const text = `${username}|${password}`
    return Base64.encode(text)
}