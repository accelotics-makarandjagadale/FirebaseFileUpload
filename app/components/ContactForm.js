"use client";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
    file: null, 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!formData.file) {
        alert("Please select a file to upload.");
        return;
      }

      console.log("Form Data: ", formData);
  
      const storageRef = ref(storage, `uploads/${formData.file.name}`);
      const fileSnapshot = await uploadBytes(storageRef, formData.file);
      const downloadURL = await getDownloadURL(fileSnapshot.ref);
      console.log("Uploaded file URL: ", downloadURL);
  
      await addDoc(collection(db, "contacts"), {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        message: formData.message,
        file_url: downloadURL, 
      });

      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
        file: null,
      });
  
      alert("Contact saved successfully!");
    } catch (err) {
      console.error("Error saving contact:", err);
      alert("Error saving contact. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <input
        type="text"
        name="middle_name"
        value={formData.middle_name}
        onChange={handleChange}
        placeholder="Middle Name"
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "white", 
          color: "black", 
        }}
      />
      <input
        type="file"
        name="file"
        onChange={handleChange}
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}
