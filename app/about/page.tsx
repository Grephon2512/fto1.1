// // import React from "react";

// // const ContactUs: React.FC = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
// //       <header className="text-center mb-10">
// //         <h1 className="text-4xl font-bold text-gray-800">Style Sync</h1>
// //         <p className="text-lg text-gray-600">
// //           Your One-Stop AI-Powered Hub for Customizable Clothing
// //         </p>
// //       </header>

// //       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //           Contact Us
// //         </h2>
// //         <p className="text-gray-600">
// //           Have questions, feedback, or need assistance? We're here to help!
// //           Reach out to us through the form below or connect with us via email or
// //           social media.
// //         </p>
// //       </section>

// //       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //           Get in Touch
// //         </h2>
// //         <form action="/submit_form" method="post" className="space-y-4">
// //           <label className="block text-gray-700">Full Name:</label>
// //           <input
// //             type="text"
// //             name="name"
// //             required
// //             className="w-full p-2 border rounded"
// //           />

// //           <label className="block text-gray-700">Email Address:</label>
// //           <input
// //             type="email"
// //             name="email"
// //             required
// //             className="w-full p-2 border rounded"
// //           />

// //           <label className="block text-gray-700">Subject:</label>
// //           <input
// //             type="text"
// //             name="subject"
// //             required
// //             className="w-full p-2 border rounded"
// //           />

// //           <label className="block text-gray-700">Message:</label>
// //           <textarea
// //             name="message"
// //             rows={5}
// //             required
// //             className="w-full p-2 border rounded"
// //           />

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
// //           >
// //             Send Message
// //           </button>
// //         </form>
// //       </section>

// //       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //           Contact Information
// //         </h2>
// //         <p>
// //           <strong>Email:</strong> support@influencerschool.com
// //         </p>
// //         <p>
// //           <strong>Phone:</strong> +91 98765 43210
// //         </p>
// //         <p>
// //           <strong>Address:</strong> 123, Digital Creator Street, Mumbai, India
// //         </p>
// //       </section>

// //       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //           Follow Us on Social Media
// //         </h2>
// //         <ul className="space-y-2">
// //           <li>
// //             <a
// //               href="https://www.instagram.com/influencerschool"
// //               className="text-blue-500 hover:underline"
// //               target="_blank"
// //             >
// //               Instagram
// //             </a>
// //           </li>
// //           <li>
// //             <a
// //               href="https://www.twitter.com/influencerschool"
// //               className="text-blue-500 hover:underline"
// //               target="_blank"
// //             >
// //               Twitter
// //             </a>
// //           </li>
// //           <li>
// //             <a
// //               href="https://www.linkedin.com/company/influencerschool"
// //               className="text-blue-500 hover:underline"
// //               target="_blank"
// //             >
// //               LinkedIn
// //             </a>
// //           </li>
// //           <li>
// //             <a
// //               href="https://www.youtube.com/influencerschool"
// //               className="text-blue-500 hover:underline"
// //               target="_blank"
// //             >
// //               YouTube
// //             </a>
// //           </li>
// //         </ul>
// //       </section>

// //       <footer className="text-gray-600 mt-10">
// //         <p>&copy; 2025 Influencer School. All Rights Reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default ContactUs;
// "use client";

// import React, { useState } from "react";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const contactInfo = {
//     email: "support@influencerschool.com",
//     phone: "+91 98765 43210",
//     address: "123, Digital Creator Street, Mumbai, India",
//     socialLinks: [
//       { name: "Instagram", url: "https://www.instagram.com/influencerschool" },
//       { name: "Twitter", url: "https://www.twitter.com/influencerschool" },
//       {
//         name: "LinkedIn",
//         url: "https://www.linkedin.com/company/influencerschool",
//       },
//       { name: "YouTube", url: "https://www.youtube.com/influencerschool" },
//     ],
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     alert("Message Sent!");
//     setFormData({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <header className="text-center mb-10">
//         <h1 className="text-4xl font-bold text-gray-800">Style Sync</h1>
//         <p className="text-lg text-gray-600">
//           Your One-Stop AI-Powered Hub for Customizable Clothing
//         </p>
//       </header>

//       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Contact Us
//         </h2>
//         <p className="text-gray-600">
//           Have questions, feedback, or need assistance? We're here to help!
//           Reach out to us through the form below or connect with us via email or
//           social media.
//         </p>
//       </section>

//       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Get in Touch
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((key) => (
//             <div key={key}>
//               <label className="block text-gray-700 capitalize">{key}:</label>
//               {key === "message" ? (
//                 <textarea
//                   name={key}
//                   rows={5}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               ) : (
//                 <input
//                   type={key === "email" ? "email" : "text"}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               )}
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Send Message
//           </button>
//         </form>
//       </section>

//       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Contact Information
//         </h2>
//         <p>
//           <strong>Email:</strong> {contactInfo.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {contactInfo.phone}
//         </p>
//         <p>
//           <strong>Address:</strong> {contactInfo.address}
//         </p>
//       </section>

//       <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Follow Us on Social Media
//         </h2>
//         <ul className="space-y-2">
//           {contactInfo.socialLinks.map((link, index) => (
//             <li key={index}>
//               <a
//                 href={link.url}
//                 className="text-blue-500 hover:underline"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <footer className="text-gray-600 mt-10">
//         <p>&copy; 2025 Influencer School. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default ContactUs;

"use client";

import BackgroundPaths from "@/components/BackgroundPath";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-black flex flex-col items-center text-center p-6">
      <BackgroundPaths />
      <motion.div
        className="bg-opacity-90 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg text-center border border-cyan-400/50 mt-10 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 bg-clip-text text-transparent mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-400 mb-6">
          We'd love to hear from you! Fill out the form below to connect with
          us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <label className="block text-gray-300">Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          />

          <label className="block text-gray-300">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          />

          <label className="block text-gray-300">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          />

          <label className="block text-gray-300">Message:</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          />

          <motion.button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg shadow-lg transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
