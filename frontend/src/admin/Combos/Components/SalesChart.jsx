import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const SalesChart = () => {
    const data = [
        { day: "May 1", sales: 20 },
        { day: "May 3", sales: 120 },
        { day: "May 5", sales: 180 },
        { day: "May 8", sales: 110 },
        { day: "May 10", sales: 170 },
        { day: "May 12", sales: 360 },
        { day: "May 14", sales: 260 },
        { day: "May 16", sales: 270 },
        { day: "May 18", sales: 390 },
        { day: "May 20", sales: 300 },
        { day: "May 22", sales: 410 },
        { day: "May 24", sales: 390 },
        { day: "May 26", sales: 400 },
        { day: "May 29", sales: 580 },
    ];

    return (
        <div className="w-[865px] h-[265px] bg-white rounded-[14px] border border-[#E4E7EC] p-[20px]">

            {/* Title */}
            <h1 className="text-[20px] font-semibold text-[#101828] leading-[28px] mb-[12px]">
                Sales Chart (This Month)
            </h1>

            {/* Chart */}
            <div className="w-full h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        {/* Grid */}
                        <CartesianGrid
                            stroke="#EAECF0"
                            strokeDasharray="0"
                            vertical={true}
                            horizontal={true}
                        />

                        {/* X Axis */}
                        <XAxis
                            dataKey="day"
                            tick={{
                                fontSize: 12,
                                fill: "#667085",
                            }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            ticks={[
                                "May 1",
                                "May 8",
                                "May 15",
                                "May 22",
                                "May 29",
                            ]}
                        />
                        <YAxis
                            domain={[0, 600]}
                            ticks={[0, 200, 400, 600]}
                            tick={{
                                fontSize: 12,
                                fill: "#667085",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#F04438"
                            strokeWidth={2}
                            fill="#FEE4E2"
                            fillOpacity={0.8}
                            dot={{
                                r: 3,
                                fill: "#F04438",
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 4,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;