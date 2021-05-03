const prod = process.env.NODE_ENV === 'production';
export const backURL = prod ? 'https://api.chudevlog.com' : 'http://localhost:3065';
