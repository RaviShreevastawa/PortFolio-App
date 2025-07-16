const Blog = () => {
  const posts = [
    {
      title: "Mastering React Performance Optimization",
      summary: "A deep dive into memoization, virtualization, and code splitting for blazing-fast React apps.",
      link: "https://medium.com/@user/react-performance"
    }
  ];
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">✍️ Blog</h2>
      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{post.summary}</p>
            <a href={post.link} target="_blank" className="text-blue-500 text-sm">Read Article →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;