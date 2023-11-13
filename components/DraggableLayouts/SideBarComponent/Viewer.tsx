import { useSession } from "next-auth/react";

export default function SideBarWindow() {
  const { status } = useSession();
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

  if (status=="loading"){
    return <div className="flex h-full w-full justify-center items-center">
        Retriving Data 
    </div>
  }

  if (status=="authenticated"){
    return <div className="h-full w-full p-2"><h2 className="text-center">Request History</h2></div>
  }
  return (
    <>
      
    </>
  );
}
