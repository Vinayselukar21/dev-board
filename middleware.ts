// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// // Define protected routes that require authentication
// const protectedRoutes = [
//   '/dashboard',
//   '/profile',
//   '/settings',
//   // Add more protected routes as needed
// ];

// // Your JWT secret (should be in .env file in production)
// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

// // Function to verify JWT token
// async function verifyToken(token: string) {
//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);
//     return { valid: true, expired: false, payload };
//   } catch (error: any) {
//     // Check if token is expired
//     if (error.code === 'ERR_JWT_EXPIRED') {
//       return { valid: true, expired: true, payload: null };
//     }
//     return { valid: false, expired: false, payload: null };
//   }
// }

// // Function to refresh the access token using refresh token with axios
// async function refreshAccessToken(refreshToken: string, apiUrl: string) {
//   try {
//     // We're using fetch in middleware since Axios would require extra config for Edge runtime
//     const response = await fetch(`${apiUrl}/auth/refresh`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to refresh token');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   // Get the path from the request
//   const path = request.nextUrl.pathname;
  
//   // Check if the current path is a protected route
//   const isProtectedRoute = protectedRoutes.some(route => 
//     path === route || path.startsWith(`${route}/`)
//   );
  
//   // If it's not a protected route, allow the request to continue
//   if (!isProtectedRoute) {
//     return NextResponse.next();
//   }
  
//   // Check for authentication tokens in cookies
//   const accessToken = request.cookies.get('access_token')?.value;
//   const refreshToken = request.cookies.get('refresh_token')?.value;
  
//   // API URL from environment
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  
//   // No tokens found - redirect to login
//   if (!accessToken && !refreshToken) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('redirectTo', path);
//     return NextResponse.redirect(loginUrl);
//   }
  
//   // Access token exists, verify it
//   if (accessToken) {
//     const { valid, expired } = await verifyToken(accessToken);
    
//     // Token is valid and not expired - allow access
//     if (valid && !expired) {
//       return NextResponse.next();
//     }
    
//     // Token is expired but we have a refresh token
//     if (valid && expired && refreshToken) {
//       // Try to get a new access token
//       const newTokens = await refreshAccessToken(refreshToken, apiUrl);
      
//       if (newTokens && newTokens.accessToken) {
//         // Create a response that will continue to the requested page
//         const response = NextResponse.next();
        
//         // Set the new tokens as cookies in the response
//         response.cookies.set('access_token', newTokens.accessToken, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV !== 'development',
//           sameSite: 'strict',
//           maxAge: 15 * 60, // 15 minutes
//           path: '/',
//         });
        
//         if (newTokens.refreshToken) {
//           response.cookies.set('refresh_token', newTokens.refreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV !== 'development',
//             sameSite: 'strict',
//             maxAge: 7 * 24 * 60 * 60, // 7 days
//             path: '/',
//           });
//         }
        
//         return response;
//       }
//     }
//   }
  
//   // If we have a refresh token but no valid access token, try refreshing
//   if (refreshToken && !accessToken) {
//     const newTokens = await refreshAccessToken(refreshToken, apiUrl);
    
//     if (newTokens && newTokens.accessToken) {
//       // Create a response that will continue to the requested page
//       const response = NextResponse.next();
      
//       // Set the new tokens as cookies in the response
//       response.cookies.set('access_token', newTokens.accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         sameSite: 'strict',
//         maxAge: 15 * 60, // 15 minutes
//         path: '/',
//       });
      
//       if (newTokens.refreshToken) {
//         response.cookies.set('refresh_token', newTokens.refreshToken, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV !== 'development',
//           sameSite: 'strict',
//           maxAge: 7 * 24 * 60 * 60, // 7 days
//           path: '/',
//         });
//       }
      
//       return response;
//     }
//   }
  
//   // If all authentication attempts fail, redirect to login
//   const loginUrl = new URL('/login', request.url);
//   loginUrl.searchParams.set('redirectTo', path);
//   return NextResponse.redirect(loginUrl);
// }

// // Configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     // Match all routes except for specific ones - update according to your routes
//     '/((?!api|_next/static|_next/image|favicon.ico|login|register|auth).*)',
//   ],
// };