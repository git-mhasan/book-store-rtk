import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditBookMutation } from '../features/api/apiSlice';

const EditForm = ({ editBookData }) => {
    const { name, author, thumbnail, price, rating, featured, id } = editBookData;

    const [editBook, { isError, isSuccess }] = useEditBookMutation();
    const navigate = useNavigate();

    const [bookEditData, setBookEditData] = useState({
        name,
        author,
        thumbnail,
        price,
        rating,
        featured,
    });

    const handleInput = (event) => {
        if (event.target.type === "checkbox") {
            setBookEditData({ ...bookEditData, [event.target.name]: event.target.checked });
        } else {
            setBookEditData({ ...bookEditData, [event.target.name]: event.target.value });
        }
    }

    const handleEditBook = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(bookEditData).some(x => x === null || x === '');
        if (!isEmpty) {
            if (bookEditData.rating > 5) bookEditData.rating = 5;
            if (bookEditData.rating < 1) bookEditData.rating = 1;

            editBook({ id, data: bookEditData });
        } else {
            alert("Please fillup all the field.");
        }
    }

    let content = <main className="py-6 2xl:px-6">
        <div className="container">
            <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
                <form className="book-form">
                    <div className="space-y-2">
                        <label htmlFor="lws-bookName">Book Name</label>
                        <input required className="text-input" type="text" id="lws-bookName" name="name"
                            value={bookEditData.name} onChange={handleInput} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lws-author">Author</label>
                        <input required className="text-input" type="text" id="lws-author" name="author"
                            value={bookEditData.author} onChange={handleInput} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lws-thumbnail">Image Url</label>
                        <input required className="text-input" type="text" id="lws-thumbnail" name="thumbnail"
                            value={bookEditData.thumbnail} onChange={handleInput} />
                    </div>

                    <div className="grid grid-cols-2 gap-8 pb-4">
                        <div className="space-y-2">
                            <label htmlFor="lws-price">Price</label>
                            <input required className="text-input" type="number" id="lws-price" name="price"
                                value={bookEditData.price} onChange={handleInput} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lws-rating">Rating</label>
                            <input required className="text-input" type="number" id="lws-rating" name="rating" min="1"
                                max="5" value={bookEditData.rating} onChange={handleInput} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input id="lws-featured" type="checkbox" name="featured" className="w-4 h-4" checked={bookEditData.featured}
                            onChange={handleInput} />
                        <label htmlFor="lws-featured" className="ml-2 text-sm"> This is a featured book </label>
                    </div>

                    <button type="submit" className="submit" id="lws-submit" onClick={handleEditBook}>Edit Book</button>
                </form>
            </div>
        </div>
    </main>;

    if (isError) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error editing Book.</h4>

                    <button type="submit" className="submit" id="lws-submit" onClick={() => navigate("/")}>Go back to Book Store</button>

                </div>
            </div>
        </main>
    }

    if (isSuccess) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">Book Edit Successfull!</h4>
                    {/* <button type="submit" className="submit" id="lws-submit" onClick={() => navigate("/")}>Go back to Book Store</button> */}
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

export default EditForm;