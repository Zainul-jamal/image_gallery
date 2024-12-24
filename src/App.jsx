// Import necessary libraries
import React, { useState } from "react";
import { Upload, Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";


const App = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const submit = async () => {
    setLoading(true);
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
      formData.append("upload_preset", "image_uploaer");
    });

    try {
      const responses = await Promise.all(
        fileList.map((file) => {
          const formData = new FormData();
          formData.append("file", file.originFileObj);
          formData.append("upload_preset", "image_uploaer");
          return axios.post(
            `https://api.cloudinary.com/v1_1/duwxilvya/image/upload`
,
            formData
          );
        })
      );
      const images = responses.map((response) => response.data.secure_url);
      setUploadedImages(images);
      console.log("Uploaded Images:", images);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">MERN STACK Project</h2>

        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false} // Prevent automatic upload
        >
          {fileList.length < 8 && (
            <div className="flex flex-col items-center">
              <PlusOutlined className="text-lg mb-2" />
              <span>Upload</span>
            </div>
          )}
        </Upload>

        <Button
          className="font-serif font-bold text-2xl mt-5 w-full"
          type="primary"
          onClick={submit}
          disabled={fileList.length === 0 || loading}
        >
          {loading ? <Spin /> : "Upload Image"}
        </Button>
</div>
        <div className="mt-6 m-5 ">
          {uploadedImages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-2">Uploaded Images:</h3>
              <div className="grid p-5 grid-cols-2 gap-4">
                {uploadedImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-96 rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      
                {/*Custom image gallery  */}
                <>

  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
      
      <div className="flex flex-wrap md:-m-2 -m-1">
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 p-1 w-1/2">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block"
              src="https://res.cloudinary.com/duwxilvya/image/upload/v1735031853/tkany02qitpgal3hnh8x.png"
            />
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block"
              src="https://images.unsplash.com/photo-1587404783862-b46fda851d01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGklMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
            />
          </div>
          <div className="md:p-2 p-1 w-full">
            <img
              alt="gallery"
              className="w-full h-auto object-cover object-center block"
              src="https://res.cloudinary.com/duwxilvya/image/upload/v1735032795/ekrtjzuhurbsg5iwjx8j.jpg"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 p-1 w-full">
            <img
              alt="gallery"
              className="w-full h-auto object-cover object-center block"
              src="https://res.cloudinary.com/duwxilvya/image/upload/v1735031874/oilqcvexsulze8akbobz.png"
            />
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block"
              src="https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aSUyMHBob25lfGVufDB8fDB8fHww"
            />
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block"
              src="https://res.cloudinary.com/duwxilvya/image/upload/v1735031853/tkany02qitpgal3hnh8x.png"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
<marquee behavior="" direction=""><p className="font-serif">Zain ul Abedin</p></marquee>
</>


                {/*Custom image gallery  */}


    </div>
  );
};

export default App;
