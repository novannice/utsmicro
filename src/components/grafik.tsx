"use client"
import { Thermometer } from "lucide-react"
import { CartesianGrid, XAxis, YAxis, Bar, ComposedChart } from "recharts"

import { ChartConfig, ChartContainer,  ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useRealtimeData } from "@/app/utils/realtimedata"

let chartData = [
  { no: "1", value: 186},
  { no: "2", value: 305},
  { no: "3", value: 237},
  { no: "4", value: 73},
  { no: "5", value: 209},
  { no: "6", value: 214},
  { no: "7", value: 305},
  { no: "8", value: 237},
  { no: "9", value: 73},
  { no: "10", value: 209},
]

const chartConfig = {
  value: {
    icon: Thermometer,
    label: "value",
    // color: "#2563eb",
  },
} satisfies ChartConfig

type valueSensor = {
  id: number,
  value: number,
}

export function Grafik({sensor} : {sensor: valueSensor[]}) {
  useRealtimeData("sensor_value")
  sensor?.map(() => {
    const last10 = sensor.slice(-10)
    chartData = Array.from({ length: 10 }, (_, i) => ({
      no: (i + 1).toString(),
      value: last10[i]?.value ?? 0,
    }));
  })

  return (<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ComposedChart accessibilityLayer data={chartData}>
    
        <CartesianGrid vertical={false} />
        <XAxis
            dataKey="no"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
            dataKey="value"
        />
        <ChartTooltip content={<ChartTooltipContent labelKey="value"/>} />
        <Bar dataKey="value" barSize={80} radius={[8, 8, 0, 0]} opacity={1} fill="#fff"  />
      </ComposedChart>
    </ChartContainer>
  )
}
