import { createClient } from "@/app/utils/supabase/server";
import MyTable from "@/components/mytable";
import { MyPieChart } from "@/components/pie-chart";
import { MyRadarChart } from "@/components/radarchart";
import { Card } from "@/components/ui/card";

export default async function Page() {
    const supabase = await createClient();
    const { data,count } = await supabase.from("status_sensor").select('*', { count: 'exact', head: false })
    .order('id', { ascending: false })
    .limit(10);

    const { count: totalOn, error: errorOn } = await supabase
  .from("status_sensor")
  .select("*", { count: "exact", head: true })
  .eq("value", 1);

if (errorOn) {
  console.error(errorOn);
}

// Hitung total value = 0
const { count: totalOff, error: errorOff } = await supabase
  .from("status_sensor")
  .select("*", { count: "exact", head: true })
  .eq("value", 0);

if (errorOff) {
  console.error(errorOff);
}
  return (
    <div className="w-[90%] h-[95vh] m-auto rounded-xl flex flex-col items-center justify-around bg-accent text-accent-foreground">
        <div className="w-full h-[100%] flex items-center justify-around">
            <div className="w-[70%] h-full rounded-md flex flex-col ">
                <Card className="h-[70%]">
                    <MyTable data={data ?? []} />
                </Card>
                <div className="h-[30%] w-[100%] flex items-center justify-center">
                    <Card className="w-[33.4%] h-[100%] flex justify-center items-center flex-col">
                        <h1 className="text-xl font-semibold">Total Data</h1>
                        <h1 className="text-6xl font-bold">{count}<span className="text-sm font-extralight">Data</span></h1>
                    </Card>
                    <Card className="w-[33.4%] h-[100%] flex justify-center items-center flex-col text-green-400">
                        <h1 className="text-xl font-semibold">Total Data On</h1>
                        <h1 className="text-6xl font-bold">{totalOn}<span className="text-sm font-extralight">Data On</span></h1>
                    </Card>
                    <Card className="w-[33.4%] h-[100%] flex justify-center items-center flex-col text-red-600">
                        <h1 className="text-xl font-semibold">Total Data Off</h1>
                        <h1 className="text-6xl font-bold">{totalOff}<span className="text-sm font-extralight">Data Off</span></h1>
                    </Card>
                </div>
            </div>
            <div className="w-[30%] h-[50%] flex flex-col items-center justify-center">
                <MyPieChart data={data ?? []}/>
                <MyRadarChart data_sensor={data ?? []}/>
            </div>
        </div>
    </div>
  )
}
