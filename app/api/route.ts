// @ts-nocheck
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios, { AxiosRequestConfig } from "axios";
import { db } from "@/db/connection";
import { Proxies } from "@/db/schema";
import {
  BodyType,
  OptionTypes,
  AuthType,
} from "@/components/MainScreen/Windows/req-windows/modules/interface";

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
  } & OptionTypes;

  const { url, method, email, ...rest } = data;
  // axios()
  // console.clear();

  let ApplicationData = {
    headers: rest.Header.filter((e) => e.key != "").reduce((acc, curr) => {
      acc[curr.key] = curr.Value;
      return acc;
    }, {}),
    params: rest.Parameter.filter((e) => e.key != "").reduce((acc, curr) => {
      acc[curr.key] = curr.Value;
      return acc;
    }, {}),
  } as AxiosRequestConfig<any>;

  if (rest.Body.type == BodyType.APPLICATION_JSON) {
    ApplicationData.headers["Content-Type"] = "application/json";
    ApplicationData.data = JSON.parse(rest.Body.payload);
  }

  if (rest.Body.type == BodyType.APPLICATION_XML) {
    ApplicationData.headers["Content-Type"] = "application/xml";
    ApplicationData.data = rest.Body.payload;
  }

  if (rest.Body.type == BodyType.APPLICATION_X_FORM_ENCODE) {
    ApplicationData.headers["Content-Type"] =
      "application/x-www-form-urlencoded";
    console.log(rest.Body.forms);
    ApplicationData.data = rest.Body.forms
      .filter((e) => e.key != "")
      .reduce((acc, curr) => {
        acc[curr.key] = curr.Value;
        return acc;
      }, {});
  }
  if (rest.Body.type == BodyType.NONE) {
    delete ApplicationData.data;
    ApplicationData.headers["Content-Type"] = "none";
  }

  if (rest.Auth.type == AuthType.BASIC) {
    ApplicationData.auth = {
      username: rest.Auth.username,
      password: rest.Auth.password,
    };
  }

  if (rest.Auth.type == AuthType.BEARER) {
    ApplicationData.headers["Authorization"] = `Bearer ${rest.Auth.token}`;
  }
  ApplicationData.headers[ "x-server-ip"]=REQUEST.ip;


  // console.log(
  //   JSON.stringify(
  //     (() => {
  //       return ApyaloadData;
  //     })(),
  //     null,
  //     2
  //   )
  // );

  let ResponseData = await AxiosIntersecpt()({
    // responseType: "arraybuffer",
    method: data.method,
    url: data.url,
   ...ApplicationData,
  });

  if (data.email) {
    // console.warn("Post is Disabled for Now")
    

    let TempData = await db.insert(Proxies).values({
      email: data.email as any,
      method: data.method.toUpperCase() as any,
      url: data.url,
      name: data.windowName
    });
    console.log("Proxy inserted")



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
