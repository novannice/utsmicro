import { createClient } from "@/app/utils/supabase/server";
import MyTable from "@/components/mytable";
import {TotalData} from "@/components/mytable";
import { Card } from "@/components/ui/card";

export default async function Page() {
    const supabase = await createClient();
    const { data,count } = await supabase.from("status_sensor").select('*', { count: 'exact', head: false })
    .order('id', { ascending: false })
    .limit(8);
  return (
    <div className="w-[90%] h-[95vh] m-auto rounded-xl flex flex-col items-center justify-around bg-accent text-accent-foreground">
        {/* <div className="w-full h-[24%] flex items-center justify-around">
            <Card className="w-[100%] h-full rounded-md flex flex-row justify-center items-center gap-2">
                <TotalData data={count ?? ""} />
                <h1 className="text-md font-extralight">data</h1>
            </Card>
        </div> */}
        <div className="w-full h-[100%] flex items-center justify-around">
            <div className="w-[100%] h-full rounded-md">
                <Card className="h-full">
                    <MyTable data={data ?? []} />
                </Card>
            </div>
        </div>

    </div>
  )
}
