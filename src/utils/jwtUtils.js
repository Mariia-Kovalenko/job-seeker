import { jwtDecode } from 'jwt-decode'; // Use named import for recent versions

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    // Handle decoding errors (e.g., malformed token)
    console.error('Error decoding token:', error);
    return true;
  }
};
