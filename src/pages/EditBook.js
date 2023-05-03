import React from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../components/EditForm';
import { useGetBookQuery } from '../features/api/apiSlice';

const EditBook = () => {
    const { bookId } = useParams();
    const { data: editBookData, isLoading, isError } = useGetBookQuery(bookId);

    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>;
    }
    if (!isLoading && isError) {
        content = <div>There was an error!</div>;
    }
    if (!isLoading && !isError && editBookData?.id) {
        content = <EditForm editBookData={editBookData} />;
    }

    return (
        <>
            {content}
        </>
    );
};

export default EditBook;