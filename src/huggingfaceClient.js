import { pipeline } from "@huggingface/transformers";

const classifyImage = async(imageUrl) => {
  // Initialize the image classification pipeline
  const classifier = await pipeline(
    "image-classification",
    "Xenova/vit-base-patch16-224"
  );

  // Run the classifier on the provided image URL
  const output = await classifier(imageUrl);
  return output
}




export default classifyImage;
