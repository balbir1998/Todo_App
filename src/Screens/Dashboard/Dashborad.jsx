import { useState, useEffect } from 'react';
import { useTheme } from "../../utils/ThemeContext";
import Model from "../../components/Model/Model";
import List from "../../components/List/List";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './../../utils/AuthContext';
import { BounceLoader } from 'react-spinners';
import ListShimmer from './../../components/ShimmerEffect/ListShimmer';

const Dashborad = () => {
    const { darkMode } = useTheme();
    const [data, setData] = useState([]);
    const [model, setModel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);
    const { user } = useAuth();

    const fetchData = async () => {
        if (!loading) setLoading(true);
        if (data.length) setData([]);

        const listsRef = collection(db, "lists")
        const q = query(listsRef, where("addedBy", "==", user.uid));

        try {
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                throw new Error("list is empty");
            };

            const lists = snapshot.docs.map(doc => {
                const { title, date, priority } = doc.data();

                return { title, date, priority, id: doc.id };
            });

            setData(lists);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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


            {
                loading && (
                    <ListShimmer />
                )
            }

            {
                (data.length === 0 && !loading) && (
                    <h1 className={`text-center text-3xl mt-10 ${darkMode ? "bg-black text-white" : ""}`}>
                        No items to do
                    </h1>
                )
            }

            {data.length !== 0 && (
                <div className="mt-10 flex flex-col gap-5">
                    {
                        data.map(({ id, title, priority, date }, idx) => (
                            <List
                                id={id}
                                key={idx}
                                title={title}
                                priority={priority}
                                date={date}
                                fetchData={fetchData}
                                setModel={setModel}
                                setEditData={setEditData}
                                data={{ id, title, priority, date }}
                            />
                        ))
                    }
                </div>
            )}

            {model && (
                <Model
                    darkMode={darkMode}
                    setModel={setModel}
                    fetchData={fetchData}
                    editData={editData}
                    setEditData={setEditData}
                />
            )}
        </div>
    )
}

export default Dashborad;