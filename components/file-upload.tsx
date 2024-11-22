"use client";

import { ChangeEvent, forwardRef, useCallback, useState } from "react";
import { UploadIcon, X } from "lucide-react";

type FileUploadProps = {
  uploadMode?: "single" | "multi";
  defaultText?: string;
  otherText?: string;
  maxSize?: number;
  acceptedFileTypes?: Record<string, string[]>;
  errors?: string | string[];
  name?: string;
  onChange?: (event: {
    target: { name: string; files: FileList | null };
  }) => void;
};

/**
 * A React component for uploading files. Supports single and multiple file uploads with validation.
 */
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      uploadMode = "single",
      defaultText = "Select or drag and drop your files here",
      otherText = "(PDF, Excel files, Image files up to 20MB)",
      maxSize = 20 * 1024 * 1024, // 20MB
      acceptedFileTypes = {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      errors,
      name = "file",
      onChange,
    },
    ref
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }, []);

    const validateFile = useCallback(
      (file: File) => {
        if (file.size > maxSize) {
          return "File is too large";
        }

        const fileType = file.type;
        const isAccepted = Object.keys(acceptedFileTypes).some(
          (type) =>
            fileType.startsWith(type) ||
            acceptedFileTypes[type].some((ext) =>
              file.name.toLowerCase().endsWith(ext)
            )
        );

        if (!isAccepted) {
          return "File type not accepted";
        }

        return null;
      },
      [maxSize, acceptedFileTypes]
    );

    const handleFiles = useCallback(
      (newFiles: File[]) => {
        for (const file of newFiles) {
          const validationError = validateFile(file);
          if (validationError) {
            setError(validationError);
            return;
          }
        }

        const filesToAdd =
          uploadMode === "single" ? [newFiles[0]] : [...files, ...newFiles];
        setFiles(filesToAdd);
        setError(null);

        // Create a new FileList-like object
        const dataTransfer = new DataTransfer();
        filesToAdd.forEach((file) => dataTransfer.items.add(file));

        // Trigger onChange with the new FileList
        onChange?.({
          target: {
            name,
            files: dataTransfer.files,
          },
        });
      },
      [uploadMode, files, onChange, name, validateFile]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer?.files || []);
        handleFiles(droppedFiles);
      },
      [handleFiles]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFiles(selectedFiles);
      },
      [handleFiles]
    );

    const removeFile = useCallback(
      (fileToRemove: File) => {
        const newFiles = files.filter((f) => f !== fileToRemove);
        setFiles(newFiles);

        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));

        onChange?.({
          target: {
            name,
            files: newFiles.length > 0 ? dataTransfer.files : null,
          },
        });
      },
      [files, onChange, name]
    );

    return (
      <div className="w-full">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : error
              ? "border-red-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={ref}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept={Object.entries(acceptedFileTypes)
              .flatMap(([type, exts]) => [...exts, type])
              .join(",")}
            multiple={uploadMode === "multi"}
            name={name}
          />

          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">{defaultText}</p>
            <p className="mt-1 text-xs text-gray-500">{otherText}</p>
          </div>
        </div>

        {(error || errors) && (
          <p className="mt-2 text-sm text-red-500">
            {error || (Array.isArray(errors) ? errors.join(", ") : errors)}
          </p>
        )}

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
