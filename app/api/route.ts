// @ts-nocheck
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

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
  };

  let ResponseData = await AxiosIntersecpt()({
    // responseType: "arraybuffer",
    method: data.method,
    url: "https://dhananjaay.dev",
    headers: {
      // this logs the IP of Original Request
      "x-server-ip": REQUEST.ip,
    },
  });

  //   console.log(ResponseData)
//   console.log(ResponseData.data);
  let dataSizeInBytes = Buffer.from(JSON.stringify(ResponseData.data)).length;

  const dataSizeInKB = dataSizeInBytes / 1024;
  return NextResponse.json({
    responsePayload: ResponseData.data.toString(),
    responseHeaders: ResponseData.headers,
    responseDuration: ResponseData.duration,
    responseSize: dataSizeInKB.toFixed(2),
  });
}
