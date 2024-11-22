"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { join } from "node:path";
import { mkdir } from "fs/promises";
import { unlink, writeFile } from "node:fs/promises";

type ProcessFileState = {
  data: string | null;
  error: string | null;
};

const UPLOAD_DIR = join(process.cwd(), "uploads");
const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

async function initializeClients() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  return {
    genAI: new GoogleGenerativeAI(apiKey),
    fileManager: new GoogleAIFileManager(apiKey),
  };
}

function validateFile(file: File): string | null {
  if (!file) {
    return "No file provided";
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Invalid file type. Allowed types: JPEG, PNG, PDF";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds the maximum allowed size";
  }

  return null;
}

export async function processFile(
  prevState: ProcessFileState,
  formData: FormData
): Promise<ProcessFileState> {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });

    const file = formData.get("file") as File;
    const validationError = validateFile(file);

    if (validationError) {
      return { data: null, error: validationError };
    }

    const { genAI, fileManager } = await initializeClients();

    const tempFilePath = join(UPLOAD_DIR, `${Date.now()}-${file.name}`);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(tempFilePath, fileBuffer);

    try {
      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: file.type,
        displayName: file.type,
      });

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        {
          text: "Extract invoice data including serial number, customer name, product name, quantity, tax, total amount, and date. Return the data in JSON format.",
        },
      ]);

      const response = await result.response.text();

      return { data: response, error: null };
    } finally {
      await unlink(tempFilePath).catch(console.error);
    }
  } catch (error) {
    console.error("Error processing file:", error);

    if (error instanceof Error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: "Failed to process file" };
  }
}
