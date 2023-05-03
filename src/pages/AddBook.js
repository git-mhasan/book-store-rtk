import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddBookMutation, useGetBooksQuery } from '../features/api/apiSlice';
import nextId from '../utils/nextId';

const AddBook = () => {
    const { data: books } = useGetBooksQuery();
    const [addBook, { isError, isSuccess }] = useAddBookMutation();
    const navigate = useNavigate();
    const [bookAddData, setBookAddData] = useState({
        name: "",
        author: "",
        thumbnail: "",
        price: "",
        rating: "",
        featured: false,
    });

    const handleInput = (event) => {
        if (event.target.type === "checkbox") {
            setBookAddData({ ...bookAddData, [event.target.name]: event.target.checked });
        } else {
            setBookAddData({ ...bookAddData, [event.target.name]: event.target.value });
        }
    }

    const handleAddBook = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(bookAddData).some(x => x === null || x === '');
        if (!isEmpty) {
            let nextBookId = nextId(books);
            if (bookAddData.rating > 5) bookAddData.rating = 5;
            if (bookAddData.rating < 1) bookAddData.rating = 1;

            addBook({ ...bookAddData, id: nextBookId });
        } else {
            alert("Please fillup all the field.");
        }
    }

    let content = <main className="py-6 2xl:px-6">
        <div className="container">
            <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
                <form className="book-form">
                    <div className="space-y-2">
                        <label htmlFor="lws-bookName">Book Name</label>
                        <input required className="text-input" type="text" id="lws-bookName" name="name"
                            value={bookAddData.name} onChange={handleInput} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lws-author">Author</label>
                        <input required className="text-input" type="text" id="lws-author" name="author"
                            value={bookAddData.author} onChange={handleInput} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lws-thumbnail">Image Url</label>
                        <input required className="text-input" type="text" id="lws-thumbnail" name="thumbnail"
                            value={bookAddData.thumbnail} onChange={handleInput} />
                    </div>

                    <div className="grid grid-cols-2 gap-8 pb-4">
                        <div className="space-y-2">
                            <label htmlFor="lws-price">Price</label>
                            <input required className="text-input" type="number" id="lws-price" name="price"
                                value={bookAddData.price} onChange={handleInput} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lws-rating">Rating</label>
                            <input required className="text-input" type="number" id="lws-rating" name="rating" min="1"
                                max="5" value={bookAddData.rating} onChange={handleInput} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input id="lws-featured" type="checkbox" name="featured" className="w-4 h-4"
                            checked={bookAddData.featured} onChange={handleInput} />
                        <label htmlFor="lws-featured" className="ml-2 text-sm"> This is a featured book </label>
                    </div>

                    <button type="submit" className="submit" id="lws-submit" onClick={handleAddBook}>Add Book</button>
                </form>
            </div>
        </div>
    </main>

    if (isError) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error adding Book.</h4>

                    <button type="submit" className="submit" id="lws-submit" onClick={() => navigate("/")}>Go back to Book Store</button>

                </div>
            </div>
        </main>
    }
    if (isSuccess) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">Book Added Successfully!</h4>
                </div>
            </div>
        </main>
        navigate("/");
    }

    return (
        <>
            {content}
        </>
    );
};

export default AddBook;