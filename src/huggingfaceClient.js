import { pipeline } from "@huggingface/transformers";

const imageToText = pipeline("image-classification", "path/to/your/model");

export default imageToText;
