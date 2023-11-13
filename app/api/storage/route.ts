import { db } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import { Proxies, type NewProxy } from "@/db/schema";
import { eq } from "drizzle-orm";

// POST removed as User can't make request only Proxy server can add request
// export async function POST(REQUEST: NextRequest) {
//   let data = await REQUEST.json();

//   if (
//     data.email === undefined ||
//     data.url === undefined ||
//     data.method === undefined
//   ) {
//     return NextResponse.json(
//       {
//         message: "Please Provide email, url, method",
//       },
//       {
//         status: 400,
//         statusText: "Bad Request",
//       }
//     );
//   }

//   let Data = await db.insert(Proxies).values({
//     email: data.email,
//     method: data.method,
//     url: data.url,
//   });
//   if (Data.rowCount === 0) {
//     return NextResponse.json(
//       {
//         message: "Something Went Wrong",
//       },
//       {
//         status: 500,
//         statusText: "Internal Server Error",
//       }
//     );
//   } else {
//     return NextResponse.json(
//       {
//         message: "Data Inserted",
//       },
//       {
//         status: 201,
//         statusText: "Created",
//       }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  let querryFor = searchParams.get("email");
  if (!querryFor) {
    return NextResponse.json({
      message: "Please Provide email",
    });
  }
  let Data = await db
    .select()
    .from(Proxies)
    .where(eq(Proxies.email, querryFor));
  return NextResponse.json(Data);
}
