import { useState } from 'react';
import { useTheme } from './../../utils/ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../utils/firebaseConfig';
import { doc, deleteDoc } from "firebase/firestore";
import Loader from '../Loader/Loader';

const List = ({ id, title, priority, date, fetchData, setModel, data, setEditData }) => {
    const { darkMode } = useTheme();
    const [loading, setLoading] = useState(false);

    const deleteItem = async () => {
        const confirmDelete = confirm("Are you sure you to delete?");
        if (!confirmDelete) return;

        setLoading(true);

        const docRef = doc(db, "lists", id);

        try {
            await deleteDoc(docRef);
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div
                className={`w-full p-5 rounded-[10px] flex justify-between gap-4
                                items-center shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                                ${darkMode ? "bg-[rgb(40,40,40)] text-white"
                        : "bg-white text-black"}`}
            >
                <div className="max-w-[80%] flex flex-col md:flex-row items-start md:items-center gap-2.5 text-[20px]">
                    <span>{title}</span>
                    <span className={`uppercase px-1.25 py-px rounded-[5px] text-white text-[16px] font-bold ${priority}`}>
                        {priority}
                    </span>
                    <span className="text-sm">{date}</span>
                </div>

                <div className="flex items-center gap-2.5 *:p-2.5 md:*:p-3.75 *:rounded-[10px]
                            *:text-black *:cursor-pointer *:border-2 *:border-black">
                    <div
                        className="bg-[yellow]"
                        onClick={() => {
                            setEditData(data);
                            setModel(true);
                        }}
                    >
                        <EditIcon />
                    </div>

                    <div className="bg-[rgb(255,74,74)]" onClick={deleteItem}>
                        <DeleteIcon />
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;