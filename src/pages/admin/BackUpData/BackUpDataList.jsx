import BackUpDataContext from '../../../contexts/BackUpData/BackUpDataContext'
import { getBackUpData } from '../../../contexts/BackUpData/BackUpDataAction'
import { useContext, useEffect, useState } from 'react'
import BackUpDataItem from './components/BackUpDataItem'
import Spinner from '../../../ui/Spinner'
import FilterCategories from './components/FilterCategories'
import FilterAuthor from '../Book/components/FilterAuthor'

export default function BackUpDataList({ role, name }) {
    const [selectedCategory, setSelectedCategory] = useState('all_categories');
    const [selectedAuthor, setSelectedAuthor] = useState('all_author');
    const { listsBackUpData, dispatch, loading } = useContext(BackUpDataContext)
    const filterBooksByCategory = (category) => {
        if (category === 'all_categories') {
            return listsBackUpData;
        } else if (category === "free") {
            return listsBackUpData.filter((item) => item.data.price === 0);
        } else {
            return listsBackUpData.filter((item) => item.data.categories === category);
        }
    };

    const filterBooksByAuthor = (author) => {
        if (author === 'all_author') {
            return listsBackUpData;
        } else {
            return listsBackUpData.filter((item) => item.data.author === author);
        }
    };
    useEffect(() => {
        dispatch({ type: "SET_LOADING" })
        const unsubscribe = getBackUpData((data) => {
            dispatch({ type: "SET_ALL_BACK_DATA", payload: data })
        })
        return () => unsubscribe
    }, [dispatch])
    return (
        <ul className='flex flex-col gap-5 p-5'>
            {!listsBackUpData.length ? <div className='h-screen flex justify-center items-center md:text-4xl'>No backup data</div> : loading ? <Spinner type="full" /> : <div className='flex-col gap-5'>
                <div className="flex gap-2 md:gap-5 justify-end">
                    <FilterCategories onSelectChange={setSelectedCategory} />
                    <FilterAuthor onSelectChange={setSelectedAuthor} />
                </div>
                <ul className='flex-col gap-5 p-5'>
                    {filterBooksByCategory(selectedCategory)
                        .filter((item) => filterBooksByAuthor(selectedAuthor).includes(item))
                        .map((item) => (
                            <BackUpDataItem data={item.data} key={item.bookId} bookId={item.bookId} role={role} name={name} />
                        ))}
                </ul>
            </div>}
        </ul>
    )
}
