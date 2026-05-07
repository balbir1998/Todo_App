import { useState } from 'react';
import { useTheme } from "../../utils/ContextAPI";
import Model from "../../components/Model/Model";
import List from "../../components/List/List";

const Dashborad = () => {
    const { darkMode } = useTheme();
    const [model, setModel] = useState(false);

    return (
        <div className="px-5 py-2.5 lg:px-40 lg:py-5">
            <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4">
                <div className={`shrink-0 p-4 text-[20px] rounded-[10px] cursor-pointer
                    shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    ${darkMode ? "bg-[rgb(23,20,20)] text-white border-2"
                        : "bg-[whitesmoke] text-[rgb(40,40,40)]"}`}
                    onClick={() => setModel(true)}
                >
                    Add +
                </div>

                <div className="flex items-center gap-2.5 flex-wrap text-white *:uppercase
                *:px-1.25 *:py-px *:border-2 *:border-black *:rounded-[5px] *:cursor-pointer">
                    <span className="bg-[red]">High</span>
                    <span className="bg-[cornflowerblue]">Medium</span>
                    <span className="bg-[yellow] text-black">Low</span>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
                {
                    items.map(({ title, priority, date }, idx) => (
                        <List
                            key={idx}
                            title={title}
                            priority={priority}
                            date={date}
                        />
                    ))
                }
            </div>

            {model && <Model darkMode={darkMode} setModel={setModel} />}
        </div>
    )
}

export default Dashborad;

const items = [
    {
        title: "Complete React project at 10 AM",
        priority: "high",
        date: "06-05-2026"
    },
    {
        title: "Practice JavaScript loops at 2 PM",
        priority: "medium",
        date: "06-05-2026"
    },
    {
        title: "Update resume at 4 PM",
        priority: "high",
        date: "06-05-2026"
    },
    {
        title: "Watch coding tutorials at 6 PM",
        priority: "low",
        date: "06-05-2026"
    }
];
