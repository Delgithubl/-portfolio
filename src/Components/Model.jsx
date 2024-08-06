import React, { useState } from "react";

const Model = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    formData.append("access_key", "fbd50aff-6f24-478e-9603-6af95308c1f1");
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert('Thanks for connecting with me');
      } else {
        alert('Something went wrong, please try again and my mail id is ajaykhati532@gmail.com');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('There was an error submitting the form, please try again.');
    }
  };
  

  return (
    <div className=" inset-0 bg-[#111] bg-opacity-70 backdrop-blur-sm flex flex-wrap justify-center items-center">
      {/* About Me Section */}
      <div className=" boder bg-white text-black h-auto  mt-20  w-full md:w-1/2 lg:w-1/3 m-4 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-2xl font-sans font-extrabold mb-2">About Me</h1>
          <h5 className="font-sans font-bold text-slate-600 mb-4">
            Interactive Front-end Developer
          </h5>
        </div>
        <div className="text-center font-[Poppins]">
          <p className="font-sans">
            I'm <span className="font-bold text-yellow-700">Ajay Khati</span>, a{" "}
            <span className="font-bold text-yellow-700">23-year-old</span>{" "}
            <span className="font-bold text-yellow-700">Indian</span>{" "}
            <span className="font-bold text-yellow-700">
              Freelance Front-end Developer
            </span>
            . I'm a <span className="font-bold text-yellow-700">weird</span> guy
            who likes making{" "}
            <span className="font-bold text-yellow-700">
              weird things with web technologies
            </span>
            . I like to resolve{" "}
            <span className="font-bold text-yellow-700">design problems</span>,
            create{" "}
            <span className="font-bold text-yellow-700">
              smart user interfaces
            </span>{" "}
            and imagine{" "}
            <span className="font-bold text-yellow-700">
              useful interaction
            </span>
            , developing{" "}
            <span className="font-bold text-yellow-700">
              rich web experiences
            </span>{" "}
            &{" "}
            <span className="font-bold text-yellow-700">web applications</span>.
            When not working or futzing around with code, I study how to{" "}
            <span className="font-bold text-yellow-700">
              escape from University
            </span>
            . Actually, I'm{" "}
            <span className="font-bold text-yellow-700">for hire</span>.
          </p>
          <div className="bg-white w-auto h-52 flex text-black text-center">
            <h1 className="text-2xl font-sans font-extrabold mb-2 mt-11 p-7">
              I use html css javascript and react and tailwind for frontend
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white  font-sans  text-black mt-20 h-auto  w-full md:w-1/2 lg:w-1/3 m-4 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} met className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-extrabold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-extrabold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-extrabold text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Let’s Talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
