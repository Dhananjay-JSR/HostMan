// @ts-nocheck
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/db/connection";
import { Proxies } from "@/db/schema";

function AxiosIntersecpt() {
  axios.interceptors.request.use(
    function (config) {
      config.metadata = { startTime: new Date() };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      response.config.metadata.endTime = new Date();
      response.duration =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axios;
}
export async function POST(REQUEST: NextRequest) {
  const data = (await REQUEST.json()) as {
    url: string;
    method: string;
    email?: string;
  };

  let ResponseData = await AxiosIntersecpt()({
    // responseType: "arraybuffer",
    method: data.method,
    url: data.url,
    headers: {
      // this logs the IP of Original Request
      "x-server-ip": REQUEST.ip,
    },
  });

  if (data.email) {
    console.warn("Post is Disabled for Now")
    

    // let TempData = await db.insert(Proxies).values({
    //   email: data.email as any,
    //   method: data.method.toUpperCase() as any,
    //   url: data.url,
    // });
    // console.log("Proxy inserted")



    // if (Data.rowCount === 0) {
    //   return NextResponse.json(
    //     {
    //       message: "Something Went Wrong",
    //     },
    //     {
    //       status: 500,
    //       statusText: "Internal Server Error",
    //     }
    //   );
    // } else {
    //   return NextResponse.json(
    //     {
    //       message: "Data Inserted",
    //     },
    //     {
    //       status: 201,
    //       statusText: "Created",
    //     }
    //   );
    // }
  }

  //   console.log(ResponseData)
  //   console.log(ResponseData.data);
  let dataSizeInBytes = Buffer.from(JSON.stringify(ResponseData.data)).length;

  const dataSizeInKB = dataSizeInBytes / 1024;

  if (ResponseData.headers["content-type"].includes("application/json") ) {
    return NextResponse.json({
      responsePayload: ResponseData.data,
      responseHeaders: ResponseData.headers,
      responseDuration: ResponseData.duration,
      responseSize: dataSizeInKB.toFixed(2),
    });
  }

  return NextResponse.json({
    responsePayload: ResponseData.data.toString(),
    responseHeaders: ResponseData.headers,
    responseDuration: ResponseData.duration,
    responseSize: dataSizeInKB.toFixed(2),
  });
}
