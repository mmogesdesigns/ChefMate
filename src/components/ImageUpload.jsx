import React, {useState} from 'react';
import { useDropzone } from "react-dropzone";
import classifyImage from "../huggingfaceClient";

const ImageUpload = ({ onIngredientsRecognized }) => {
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  // function triggered when files are dropped into the dropzone
  const onDrop = async (acceptedFiles) => {
    // accepts the first file from the array
    const file = acceptedFiles[0];
    // creates a URL representing the uploaded file
    setImage(URL.createObjectURL(file));

    // // built in API to read files
    const render = new FileReader();
    render.onload = async () => {
      // encoded string of the image
      const base64Image = render.result;
      const results = await classifyImage(base64Image);
      // sets ingredients to recognized ingredients
      setIngredients(results);
      // calls the callback function with the recognized ingredients
      onIngredientsRecognized(results);
    };
    //  Reads the file and triggers the onload event when done.
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image && <img src={image} alt="Uploaded" />}
      {ingredients.length > 0 && (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageUpload;

