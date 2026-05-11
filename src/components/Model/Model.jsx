import { useTheme } from "@emotion/react";
import { createPortal } from "react-dom";
import { useState, useEffect } from 'react';
import { useAuth } from './../../utils/AuthContext';
import { db } from "../../utils/firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import Loader from './../Loader/Loader';

const Model = ({ darkMode, setModel, fetchData, editData, setEditData }) => {
    const [newItem, setNewItem] = useState({
        title: "",
        priority: "",
        date: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const addNewItem = async () => {
        setLoading(true);
        const listsRef = collection(db, "lists");

        try {
            await addDoc(listsRef, {
                ...newItem,
                addedBy: user.uid
            });
            setModel(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const updateData = async () => {
        setLoading(true);
        try {
            const listRef = doc(db, "lists", editData.id);
            await updateDoc(listRef, {
                ...newItem
            });
            setEditData(null);
            setModel(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSaveAndUpdate = async () => {
        const validate = Object.keys(newItem).every(key => {
            if (!newItem[key].trim()) {
                alert(`${key[0].toUpperCase() + key.slice(1)} is required`);
                return false;
            };

            return true;
        })

        if (!validate) return;

        if (editData) {
            updateData();
        } else {
            addNewItem();
        }
    }

    useEffect(() => {
        if (editData) {
            const { title, priority, date } = editData;
            setNewItem({ title, priority, date });
        };
    }, []);

    return (
        createPortal(
            <>
                {loading && <Loader />}
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                    <div className={`w-[70%] lg:w-[40%] rounded-[10px] p-5 ${darkMode ? "bg-[rgb(36,34,34)] text-white" : "bg-[whitesmoke] text-black"}`}>
                        <h1 className="text-[32px] font-medium">
                            {editData ? "Edit Items" : "Add Items"}
                        </h1>

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
                            <button className="bg-[red]" onClick={() => {
                                setModel(false);
                                if (editData) setEditData(null);
                            }}>
                                Cancel
                            </button>
                            <button className="bg-[rgb(24,211,86)]" onClick={handleSaveAndUpdate}>
                                {editData ? "Update" : "Save"}
                            </button>
                        </div>
                    </div >
                </div >
            </>

            , document.getElementById("root"))
    )
}

export default Model