export default function ContactPage() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <form className="max-w-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </section>
    );
  }
  