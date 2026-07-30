import { useState, useEffect } from "react";

const DataFetcher = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setloading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {data.map(
            ( post,) => (
              <li key={post.id}>{post.title}</li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
