import { Grafik } from "@/components/grafik";
import { createClient } from "../../utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("sensor_value").select();
  return (
    <>
      {/* <Navbar/> */}
      <div className=" bg-background shadow-md  overflow-hidden rounded-3xl w-[90%] h-[70vh] left-4 mx-auto flex flex-col gap-3 ">
        <h1 className="m-4">Grafik</h1>
        <Grafik sensor={data ?? []}/> 
      </div>
    </>
  );
}
