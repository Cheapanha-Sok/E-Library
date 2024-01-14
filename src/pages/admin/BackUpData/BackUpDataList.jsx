import BackUpDataContext from '../../../contexts/BackUpData/BackUpDataContext'
import { getBackUpData } from '../../../contexts/BackUpData/BackUpDataAction'
import { useContext, useEffect } from 'react'
import BackUpDataItem from './components/BackUpDataItem'
import Spinner from '../../../ui/Spinner'

export default function BackUpDataList() {

    const { listsBackUpData, dispatch, loading } = useContext(BackUpDataContext)
    useEffect(() => {
        dispatch({ type: "SET_LOADING" })
        const unsubscribe = getBackUpData((data) => {
            dispatch({ type: "SET_ALL_BACK_DATA", payload: data })
        })
        return () => unsubscribe
    }, [dispatch])
    return (
        <>
            {!listsBackUpData.length ? <p>No Order</p> : loading ? <Spinner type="full" /> : <div className='flex-col gap-5'>
                <div className="w-full md:w-1/2 mx-auto">
                </div>
                <ul className='flex-col gap-5 p-5'>
                    {listsBackUpData.map((item) => (
                        <BackUpDataItem data={item.data} key={item.bookId} bookId={item.bookId} />
                    ))}
                </ul>
            </div>}
        </>
    )
}
