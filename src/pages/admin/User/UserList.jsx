import { useContext, useEffect, useState } from 'react';
import { calculateUser, getAllUser } from '../../../contexts/user/UserAction';
import UserContext from '../../../contexts/user/UserContext';
import UserItem from './components/UserItem';
import Spinner from "../../../ui/Spinner.jsx";
import { Chart, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";

export default function UserList({ role }) {
    Chart.register(...registerables);
    const { user, dispatch, loading } = useContext(UserContext);
    const [chartData, setChartData] = useState({
        labels: ["Users", "Authors"],
        datasets: [
            {
                label: "Number Of Users",
                data: [0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' });
        const unsubscribe = getAllUser((data) => {
            dispatch({ type: 'USER_DATA', payload: data });
            const totalUser = calculateUser(data)
            setChartData((prevChartDataAuthor) => ({
                ...prevChartDataAuthor,
                datasets: [
                    {
                        ...prevChartDataAuthor.datasets[0],
                        data: [
                            totalUser.user,
                            totalUser.author,
                        ],
                    },
                ],
            }));
        });
        return () => unsubscribe;
    }, [dispatch]);

    return (
        <ul className="flex flex-col gap-5 p-5">
            {!user.length ? (
                <div className='h-screen flex justify-center items-center md:text-4xl'>No user yet</div>
            ) : loading ? (
                <Spinner type="full" />
            ) : (
                <div className='flex-col gap-5'>
                    <div className="w-full md:w-1/2 mx-auto">
                        <Bar data={chartData} />
                    </div>
                    {user.map((item) => (
                        <UserItem data={item.data} key={item.userId} userId={item.userId} roles={role} />
                    ))}
                </div>
            )}
        </ul>


    );
}
