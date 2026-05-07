import { useState } from 'react';
import { useTheme } from "../../utils/ContextAPI";
import Model from "../../components/Model/Model";
import List from "../../components/List/List";

const Dashborad = () => {
    const { darkMode } = useTheme();
    const [openModel, setOpenModel] = useState(false);

    return (
        <div className="px-5 py-2.5 lg:px-40 lg:py-5">
            <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4">
                <div className={`shrink-0 p-4 text-[20px] rounded-[10px] cursor-pointer
                    shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    ${darkMode ? "bg-[rgb(23,20,20)] text-white border-2"
                        : "bg-[whitesmoke] text-[rgb(40,40,40)]"}`}
                    onClick={() => setOpenModel(true)}
                >
                    Add +
                </div>

                {openModel && <Model />}

                <div className="flex items-center gap-2.5 flex-wrap text-white *:uppercase
                *:px-1.25 *:py-px *:border-2 *:border-black *:rounded-[5px] *:cursor-pointer">
                    <span className="bg-[red]">High</span>
                    <span className="bg-[cornflowerblue]">Medium</span>
                    <span className="bg-[yellow] text-black">Low</span>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
                {
                    tasks.map(({ task, priority, date }, idx) => (
                        <List
                            key={idx}
                            task={task}
                            priority={priority}
                            date={date}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Dashborad;

const tasks = [
    {
        task: "Complete React project at 10 AM",
        priority: "high",
        date: "06-05-2026"
    },
    {
        task: "Practice JavaScript loops at 2 PM",
        priority: "medium",
        date: "06-05-2026"
    },
    {
        task: "Update resume at 4 PM",
        priority: "high",
        date: "06-05-2026"
    },
    {
        task: "Watch coding tutorials at 6 PM",
        priority: "low",
        date: "06-05-2026"
    }
];
