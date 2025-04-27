"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { status_sensor, useRealtimeData } from "@/app/utils/realtimedata"
let chartData = [
    { alat: "1", pie:1,on: 1, off:1 },
    { alat: "2", pie:1,on: 1, off:1 },  // Nilai 0 untuk Safari
    { alat: "3", pie:1,on: 1, off:1 },  // Nilai 0 untuk Firefox
    { alat: "4", pie:1,on: 1, off:1 },
    { alat: "5", pie:1,on: 1, off:1 },  // Nilai 0 untuk Other
    { alat: "6", pie:1,on: 1, off:1 },
    { alat: "7", pie:1,on: 1, off:1 },  // Nilai 0 untuk Safari
    { alat: "8", pie:1,on: 1, off:1 },  // Nilai 0 untuk Firefox
    { alat: "9", pie:1,on: 1, off:1 },
    { alat: "10", pie:1,on: 1, off:1 },  // Nilai 0 untuk Other
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MyRadarChart({data_sensor} : {data_sensor:status_sensor[]}) {
    useRealtimeData("status_sensor");
    data_sensor?.map(() => {
    const last10 = data_sensor.slice(-10)
    chartData = Array.from({ length: 10 }, (_, i) => ({
        alat: (i + 1).toString(),
        pie: 1,
        on: last10[i]?.value == 1 ? 1 : 0,
        off: last10[i]?.value == 0 ? 1: 0,
    }));
    })
  return (
    <Card className="flex flex-col w-full min-h-[100%]">
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart status sensor</CardTitle>
        <CardDescription>
        10 data terbaru
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" radialLines={false} />
            <PolarAngleAxis dataKey="alat" />
            <Radar
              dataKey="on"
              fill="#00ff00"
              fillOpacity={0.6}
            //   dot={{
            //     r: 4,
            //     fillOpacity: 1,
            //   }}
            />
            <Radar
              dataKey="off"
              fill="#ff0000"
              fillOpacity={0.6}
            //   dot={{
            //     r: 4,
            //     fillOpacity: 1,
            //   }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        status sensor
          10 data terakhir
          dalam bentuk radar
        </div>
      </CardFooter> */}
    </Card>
  )
}
