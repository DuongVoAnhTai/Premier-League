// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value || null; // Hoặc lấy từ localStorage qua client, nhưng cookies an toàn hơn
  const { pathname } = request.nextUrl;

  // Cho phép truy cập trang login mà không cần kiểm tra token
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Nếu không có token và cố truy cập các trang khác, chuyển hướng về /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã có token, cho phép truy cập
  return NextResponse.next();
}

// Áp dụng middleware cho các tuyến đường cụ thể
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Áp dụng cho tất cả các tuyến đường trừ API, static files
};