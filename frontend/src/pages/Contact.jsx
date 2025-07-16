const Contact = () => (
  <section className="max-w-xl mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-center">📞 Contact Me</h2>
    <form className="space-y-4">
      <input 
      type="text" 
      placeholder="Name" 
      className="w-full p-2 border rounded" 
      />
      <input 
      type="email" 
      placeholder="Email" 
      className="w-full p-2 border rounded" 
      />
      <textarea 
      placeholder="Message" 
      rows="5" 
      className="w-full p-2 border rounded"
      ></textarea>
      <button 
      type="submit" 
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Message
    </button>
    </form>
  </section>
);

export default Contact;