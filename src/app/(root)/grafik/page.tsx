import { Grafik } from "@/components/grafik";
import { createClient } from "../../utils/supabase/server";
import TextPressure from "@/components/textpreasure";

export default async function Home() {
  const supabase = await createClient();
  const { data,count } = await supabase.from("sensor_value").select('*', { count: 'exact', head: false });
  return (
    <>
      {/* <Navbar/> */}
      <div className=" bg-background shadow-md  overflow-hidden rounded-3xl w-[90%] h-[90vh] left-4 mx-auto flex flex-col gap-3 ">
        <div className=" bg-background shadow-md  overflow-hidden rounded-3xl w-[100%] h-[60%] left-4 mx-auto flex gap-3 ">
          <div className=" bg-background shadow-md  overflow-hidden rounded-3xl w-[70%] h-[100%] left-4 mx-auto flex flex-col gap-3 ">
            <h1 className="m-4">Grafik</h1>
            <Grafik sensor={data ?? []}/> 
          </div>
          <div className=" bg-background shadow-md  overflow-hidden rounded-3xl w-[30%] h-[100%] left-4 mx-auto flex flex-col gap-3 justify-center items-center">
            <h1 className="text-xl font-semibold">Total Data</h1>
            <h1 className="text-6xl font-bold">{count}<span className="text-sm font-extralight">Data</span></h1>
          </div>
        </div>
        <div className=" bg-background shadow-md  rounded-3xl w-[100%] h-[40%] left-4 mx-auto  ">
        <TextPressure className="w-full h-full "
          text="MicroController!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="var(--foreground)"
          strokeColor="#ff0000"
          minFontSize={20}
        />
        </div>
      </div>
    </>
  );
}
