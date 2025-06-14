import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import { FaXmark } from "react-icons/fa6";
import { catagories } from "../../../utils/catagories";
import toast from "react-hot-toast";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      console.error("Please select an image file");
      return;
    }

    if (file) {
      setImage(file);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    const newBookData = new FormData();
    newBookData.append("category", data.category);
    newBookData.append("description", data.description);
    newBookData.append("newPrice", data.newPrice);
    if (data.oldPrice) newBookData.append("oldPrice", data.oldPrice);
    newBookData.append("title", data.title);
    newBookData.append("author", data.author);
    newBookData.append("trending", data.trending ? data.trending : false);
    newBookData.append("image", image);

    try {
      if (image) {
        await addBook(newBookData).unwrap();
        Swal.fire({
          title: "Book added",
          text: "Your book is uploaded successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, It's Okay!",
        });
        reset();
        setImagePreview(null);
        setImage(null);
      } else toast.error("Image is required");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Author */}
        <InputField
          label="Author"
          name="author"
          placeholder="Enter the name of author"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={catagories}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price (optional)"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          required={false}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <FaXmark className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Adding.. </span>
          ) : (
            <span>Add Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
