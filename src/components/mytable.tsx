"use client";
import { useRealtimeData,status_sensor } from "@/app/utils/realtimedata"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
 
 function TotalData({data} : {data:number | string}) {
    return (
        <h1 className="text-5xl font-bold">{data}</h1>
    )
 }
 function MyTable({data} : {data:status_sensor[]}) {
   useRealtimeData("status_sensor");
   return (
        <Table>
            <TableCaption>data status sensor.</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[100px]">Id</TableHead> */}
                    <TableHead className="text-center">status sensor</TableHead>
                    {/* <TableHead className="text-center">Timestamp</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item.id}>
                        {/* <TableCell className="font-medium">{item.id}</TableCell> */}
                        <TableCell className={`text-center ${
    item.value === 1 ? "text-green-600" : item.value === 0 ? "text-red-600" : ""
  }`}
>{item.value === 0 ? "OFF" : item.value === 1 ? "ON" : item.value}</TableCell>
                        {/* <TableCell className="text-right">{item.timestamp}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
   )
 }
 
 export default MyTable
 export { MyTable, TotalData };
