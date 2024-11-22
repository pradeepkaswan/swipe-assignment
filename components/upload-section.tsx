"use client";

import { useFormState, useFormStatus } from "react-dom";
import FileUpload from "./file-upload";
import { Button } from "@/components/ui/button";
import { processFile } from "@/app/actions";
import { useRef } from "react";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-blue-600 py-5 text-white text-md font-extrabold w-full mt-4"
      type="submit"
      disabled={pending}
    >
      {pending ? "Processing..." : "Process File"}
    </Button>
  );
}

export function UploadSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(processFile, initialState);

  console.log(state.data);

  return (
    <form ref={formRef} action={formAction}>
      <div>
        <FileUpload
          uploadMode="single"
          acceptedFileTypes={{
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
        />

        <SubmitButton />
      </div>

      {state?.data && (
        <pre className="mt-4 p-4 flex border rounded bg-gray-50 text-sm">
          <code>{state.data}</code>
        </pre>
      )}

      {state?.error && (
        <div className="mt-4 p-4 border border-red-200 rounded bg-red-50 text-sm text-red-600">
          {state.error}
        </div>
      )}
    </form>
  );
}
