

import React, { useState, useEffect } from "react";

export const InfiniteScroll = ({
    fetchData,
    renderItems,
    initialPage = 1,
    pageSize = 10,
    threshold = 200,
}) => {
    const [page, setPage] = useState(initialPage);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchItems();

        // Cleanup function to cancel any pending API requests
        return () => {
            // Cancel any ongoing fetch request
            setLoading(false);
        };
    }, []);

    const fetchItems = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const data = await fetchData(page, pageSize);
            const newItems = data.items || [];
            setItems((prevItems) => [...prevItems, ...newItems]);
            setHasMore(newItems.length === pageSize);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - threshold
        ) {
            fetchItems();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {renderItems(items)}

            {loading && <p>Loading...</p>}
            {!loading && !hasMore && <p>No more items to load.</p>}
        </div>
    );
};


const fetchData = (page, pageSize) => {
    // Implement your data fetching logic here, e.g., make an API request
    // and return a Promise that resolves to the fetched data
    return fetch(`https://openlibrary.org/search.json?page=${page}&pageSize=${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
            return {
                items: data.items, // Array of items for the current page
            };
        });
};

const renderItems = (items) => {
    // Implement how to render the items here
    return items.map((item) => <div key={item.id}>{item.name}</div>);
};



export const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    const handleButtonClick = () => {
        // Simulating progress by increasing the value every 500ms
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(timer);
                }
                return newProgress;
            });
        }, 500);
    };

    return (
        <div>
            <progress value={progress} max="100" />

            <button onClick={handleButtonClick}>Start Progress</button>
        </div>
    );
};




const Swiggy = () => {
    return (
        <div>
            <h1>Infinite Scrolling Example</h1>
            <InfiniteScroll fetchData={fetchData} renderItems={renderItems} />
            <ProgressBar/>
        </div>

    )
}

export default Swiggy