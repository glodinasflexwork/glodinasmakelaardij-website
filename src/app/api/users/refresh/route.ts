import { NextResponse } from (
  "next/server"
);
import { verifyRefreshToken, generateToken, generateRefreshToken, prisma } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 }
      );
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = verifyRefreshToken(refreshToken);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedRefreshToken.userId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newAccessToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    return NextResponse.json(
      { message: "Tokens refreshed successfully", token: newAccessToken, refreshToken: newRefreshToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

