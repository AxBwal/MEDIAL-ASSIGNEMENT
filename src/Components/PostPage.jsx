import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const postRef = useRef(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateOgImage = async () => {
    if (postRef.current) {
      try {
        const dataUrl = await toPng(postRef.current, {
          cacheBust: true,
          skipAutoScale: true,
          width: 1200,
          height: 630,
        });
        setOgImageUrl(dataUrl);
        toast.success("OG Image generated successfully!");
        console.log("OG Image generated:", dataUrl);
      } catch (error) {
        toast.error("Failed to generate OG image.");
        console.error("Error generating OG image:", error);
      }
    }
  };

  const downloadImage = () => {
    if (ogImageUrl) {
      const link = document.createElement("a");
      link.href = ogImageUrl;
      link.download = "og-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    }
  };

  const copyToClipboard = () => {
    if (ogImageUrl) {
      navigator.clipboard.writeText(ogImageUrl).then(
        () => {
          toast.success("URL copied to clipboard!");
        },
        (err) => {
          toast.error("Failed to copy URL.");
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-100 min-h-screen inter">
      <Helmet>
        <title>{title || "Create a Post"}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 100)} />
        <meta property="og:image" content={ogImageUrl} />
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Create a Post
      </h1>
      <div
        ref={postRef}
        className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mb-6"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          aspectRatio: "1200 / 630",
        }}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            {title}
          </h2>
          <p className="mt-2 text-gray-700 text-center">{content}</p>
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Post Preview"
              className="mt-4 rounded max-h-60 max-w-full object-contain"
            />
          )}
        </div>
      </div>
      <div className="w-full max-w-lg flex flex-col items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          className="w-full p-2 mb-4 h-32 border border-gray-300 rounded"
        />
        <input type="file" onChange={handleImageChange} className="mb-4" />
        <button
          onClick={generateOgImage}
          className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Generate OG Image
        </button>
        {ogImageUrl && (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
            <button
              onClick={downloadImage}
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Download Image
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Copy URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
