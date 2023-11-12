export default function UrlInputHolder() {
  return (
    <div className="flex items-stretch">
      <select
        name="RequestMethods"
        defaultValue={"GET"}
        className="bg-gray-800 py-1 px-2 rounded-tl-sm  rounded-bl-sm"
      >
        <option value="GET" >
          GET
        </option>
        <option value="POST">POST</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
      <input
        type="text"
        className=" bg-gray-800 placeholder:font-serif  focus:outline-none px-4 w-full"
        placeholder="URL"
        
      />
      <button className="px-4 mr-2 bg-red-600 rounded-sm ml-2">Send</button>
      <button className="px-4 bg-red-200 rounded-sm text-black">Save</button>
    </div>
  );
}
