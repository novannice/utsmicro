"use client"

import * as React from "react"
import {  Pie, PieChart } from "recharts"

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
    { alat: "1", pie:1,status: 1, fill: "#ff0000" },
    { alat: "2", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Safari
    { alat: "3", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Firefox
    { alat: "4", pie:1,status: 1, fill: "#ff0000" },
    { alat: "5", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Other
    { alat: "6", pie:1,status: 1, fill: "#ff0000" },
    { alat: "7", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Safari
    { alat: "8", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Firefox
    { alat: "9", pie:1,status: 1, fill: "#ff0000" },
    { alat: "10", pie:1,status: 1, fill: "#ff0000" },  // Nilai 0 untuk Other
  ]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function MyPieChart({data} : {data:status_sensor[]}) {
    useRealtimeData("status_sensor");

  data?.map(() => {
    const last10 = data.slice(-10)
    chartData = Array.from({ length: 10 }, (_, i) => ({
      alat: (i + 1).toString(),
      pie: 1,
      status: last10[i]?.value ?? 0,
      fill: last10[i]?.value == 0 ? "#ff0000" : "#00ff00",
    }));
  })
  

  return (
    <Card className="flex flex-col w-full min-h-[100%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie chart status sensor</CardTitle>
        <CardDescription>10 data terbaru</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="pie"
              nameKey="alat"
              innerRadius={60}
              strokeWidth={5}
            >
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      // <text
                      //   x={viewBox.cx}
                      //   y={viewBox.cy}
                      //   textAnchor="middle"
                      //   dominantBaseline="middle"
                      // >
                      //   <tspan
                      //     x={viewBox.cx}
                      //     y={viewBox.cy}
                      //     className="fill-foreground text-3xl font-bold"
                      //   >
                      //     {totalVisitors.toLocaleString()}
                      //   </tspan>
                      //   <tspan
                      //     x={viewBox.cx}
                      //     y={(viewBox.cy || 0) + 24}
                      //     className="fill-muted-foreground"
                      //   >
                      //     Visitors
                      //   </tspan>
                      // </text>
                    )
                  }
                }}
              /> */}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          status sensor
          10 data terakhir
          dalam bentuk pie
        </div>
      </CardFooter> */}
    </Card>
  )
}
