import { useSession } from "next-auth/react";
import HistoryPlay from "./Modules/HistoryPlay";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Proxy } from "@/db/schema";
import Skeleton from "./Modules/Skeleton";
import { StorageContext } from "@/components/Context/Context";

export default function SideBarWindow() {
  const { status, data } = useSession();
  const [response, setResponse] = useState<Proxy[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(StorageContext);

  //   This Applies Optismitic Updates as soon as Loading Finished so we don't have to
  // make another get request
  useEffect(() => {
    if (status == "authenticated") {
      // runs only on being authenticated
      if (state.isLoading == false) {
        // @ts-ignore
        setResponse((prev) => [
          ...prev,
          {
            email: data?.user?.email,
            id: prev?.length,
            method: state?.method,
            url: state?.url,
          },
        ]);
      }
    }
  }, [data?.user?.email, state.isLoading, status]);
  useEffect(() => {
    // Populate Result on First Mount
    async function PopulateResult() {
      let ResponseData = await axios.get(`/api/storage`, {
        params: {
          email: data?.user?.email,
        },
      });
      //   console.log(ResponseData)
      setResponse((prev) => ResponseData.data as Proxy[]);
      //   console.log(ResponseData.data)
      setLoading(false);
    }
    if (status == "authenticated") {
      // only runs on being authenticated
      PopulateResult();
    }
  }, [status]);
  // return <div className="bg-red-400 h-full">Hello WOrld</div>
  if (status === "unauthenticated") {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="w-fit text-center">
          Please Login To <div>View Your Request Histiry</div>
        </div>
      </div>
    );
  }

  if (status == "loading") {
    return (
      <div className="flex h-full w-full justify-center items-center">
        Retriving Data
      </div>
    );
  }

  if (status == "authenticated") {
    return (
      <div className="h-full w-full p-2">
        <h2 className="text-center text-xl ">Request History</h2>
        <div className="mt-3.5 flex flex-col gap-3">
          {loading ? (
            <Skeleton />
          ) : (
            response?.map((prev) => (
              <HistoryPlay
                key={prev.id}
                url={prev.url!}
                method={prev.method! as any}
              />
            ))
          )}

          {/* <HistoryPlay url="https://www.dhananjaay.dev" method="POST"/>
         <HistoryPlay url="https://www.dhananjaay.dev" method="POST"/>
         <HistoryPlay url="https://www.dhananjaay.dev" method="POST"/>
         <HistoryPlay url="https://www.dhananjaay.dev" method="POST"/> */}
        </div>
      </div>
    );
  }
  return <></>;
}
