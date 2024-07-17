const baseUrl = "http://localhost:3003/api/blogs";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);
