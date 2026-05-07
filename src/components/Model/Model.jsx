import { useTheme } from "@emotion/react";
import { createPortal } from "react-dom";
import { useState } from 'react';

const Model = ({ darkMode, setModel }) => {
    const [newItem, setNewItem] = useState({
        title: "",
        priority: "",
        date: ""
    });


    return (
        createPortal(
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                <div className={`w-[70%] lg:w-[40%] rounded-[10px] p-5 ${darkMode ? "bg-[rgb(36,34,34)] text-white" : "bg-[whitesmoke] text-black"}`}>
                    <h1 className="text-[32px] font-medium">Add Items</h1>

                    <div className="mt-4">
                        <input
                            type="text"
                            id="task"
                            placeholder="Enter Item"
                            className=" p-3.75 mb-7.5 rounded-[10px] outline-none w-full border"
                            value={newItem.title}
                            onChange={(e) =>
                                setNewItem(prevState => ({ ...prevState, title: e.target.value }))
                            }
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-6 mb-6">
                        <input
                            type="date"
                            id="date"
                            className="border md:w-1/2 rounded-[10px] p-3.75 outline-none"
                            value={newItem.date}
                            onChange={(e) =>
                                setNewItem(prevState => ({ ...prevState, date: e.target.value }))
                            }
                        />

                        <div className="flex items-start flex-wrap md:flex-nowrap gap-2.5 text-white *:uppercase
                      *:px-1.25 *:py-px *:border-2 *:border-black *:rounded-[5px] *:cursor-pointer">
                            <span
                                onClick={() => setNewItem(prevState => ({ ...prevState, priority: "high" }))}
                                className={`${newItem.priority === "high" ? "bg-black text-white scale-[1.2]"
                                    : "bg-[red]"}`}>
                                High
                            </span>
                            <span
                                onClick={() => setNewItem(prevState => ({ ...prevState, priority: "medium" }))}
                                className={`${newItem.priority === "medium" ? "bg-black text-white scale-[1.2]"
                                    : "bg-[cornflowerblue]"}`}
                            >
                                Medium
                            </span>
                            <span
                                onClick={() => setNewItem(prevState => ({ ...prevState, priority: "low" }))}
                                className={`${newItem.priority === "low" ? "bg-black text-white scale-[1.2]"
                                    : "bg-[yellow] text-black"}`}
                            >
                                Low
                            </span>
                        </div>

                    </div >

                    <div className="flex *:flex-1 gap-4 *:p-2.5 *:rounded-[10px] *:flex *:justify-center
                    *:items-center *:cursor-pointer *:font-bold *:text-white">
                        <button className="bg-[red]" onClick={() => setModel(false)}>
                            Cancel
                        </button>
                        <button className="bg-[rgb(24,211,86)]">
                            Save
                        </button>
                    </div>
                </div >
            </div >
            , document.getElementById("root"))
    )
}

export default Model