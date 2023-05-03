import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { useGetBooksQuery } from '../features/api/apiSlice';
import { selectBookType } from '../features/bookFilter/bookFilterSlice';

const Home = () => {
    const { data: books, isLoading, isError } = useGetBooksQuery();

    const dispatch = useDispatch();
    const { searchString, bookTypeFilter } = useSelector(state => state.bookFilter);

    const handletypeFilter = (typeOption) => {
        dispatch(selectBookType(typeOption));
    }

    let content = null;

    if (isLoading) {
        content = <p> Please wait while loading books.</p>;
    }
    if (!isLoading && isError) {
        content = <p> Please wait while loading books.</p>;
    }

    if (!isLoading && !isError && books?.length === 0) {
        content = <p> No books found.</p>;
    }
    if (!isLoading && !isError && books?.length > 0) {
        content = books
            .filter(book => book?.name?.toLowerCase()?.includes(searchString?.toLowerCase()))
            .filter(book => {
                if (bookTypeFilter === "all") {
                    return true;
                } else if (bookTypeFilter === "featured") {
                    return book.featured;
                }
            })
            .map(book => <BookCard key={book.id} book={book} />);
    }

    return (
        <main className="py-12 px-6 2xl:px-6 container">
            <div className="order-2 xl:-order-1">
                <div className="flex items-center justify-between mb-12">
                    <h4 className="mt-2 text-xl font-bold">Book List</h4>

                    <div className="flex items-center space-x-4">
                        <button className={`lws-filter-btn ${bookTypeFilter === "all" && "active-filter"}`} onClick={() => { handletypeFilter("all") }}>All</button>
                        <button className={`lws-filter-btn ${bookTypeFilter === "featured" && "active-filter"}`} onClick={() => { handletypeFilter("featured") }}>Featured</button>
                    </div>
                </div>
                <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {content}

                </div>
            </div>
        </main>
    );
};

export default Home;