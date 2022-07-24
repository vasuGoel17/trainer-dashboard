import "./ReactPieChart.css";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";

export default function ReactPieChart() {
    const [selected, setSelected] = useState(0);

    const data = [
        { title: "One", value: 10, color: "#d17286" },
        { title: "Two", value: 15, color: "#dfcb74" },
        { title: "Three", value: 20, color: "#50afcf" }
    ];

    return (
        <div className="pie-chart-cntnr">
            <PieChart
                data={data}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selected ? 2 : 0)}
                onMouseOver={(_, index) => {
                    setSelected(index === selected ? undefined : index);
                }}
                onMouseOut={(_, index) => {
                    setSelected(index === selected ? undefined : index);
                }}
                lineWidth={20}
                paddingAngle={0}

            />
        </div>
    );
}
