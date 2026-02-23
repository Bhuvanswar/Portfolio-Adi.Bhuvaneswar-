import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { HiOutlineCloudUpload, HiOutlineDocumentText } from "react-icons/hi";

export default function ResumeManager() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus("Uploading to Vercel Blob...");
        setProgress(10);

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                onUploadProgress: (progressEvent) => {
                    setProgress(progressEvent.percentage);
                },
            });

            setStatus("Saving link to Firestore...");
            setProgress(90);

            // Update the global configuration with the new resume URL
            await setDoc(doc(db, "config", "resume"), {
                url: newBlob.url,
                updatedAt: new Date().toISOString()
            });

            setStatus("Resume updated successfully!");
            setFile(null);
            setProgress(0);
        } catch (error) {
            console.error("Upload failed:", error);
            setStatus(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl text-center">
                <div className="inline-flex p-5 bg-red-500/10 rounded-3xl text-red-400 mb-8">
                    <HiOutlineDocumentText size={40} />
                </div>

                <h3 className="text-3xl font-extrabold text-white mb-4">Resume <span className="text-red-500">Manager</span></h3>
                <p className="text-gray-400 mb-10 leading-relaxed">
                    Upload a new PDF to update your resume link across the entire portfolio instantly.
                </p>

                <div className="space-y-8">
                    <div className="relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="py-12 border-2 border-dashed border-white/10 rounded-3xl group-hover:border-red-500/50 transition-all bg-white/[0.02]">
                            <HiOutlineCloudUpload size={40} className="mx-auto text-gray-500 group-hover:text-red-400 transition-colors mb-4" />
                            <p className="text-sm font-bold text-gray-400">
                                {file ? file.name : "Click to select or drag & drop PDF"}
                            </p>
                        </div>
                    </div>

                    {uploading && (
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-red-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs font-mono text-gray-500">{progress}% uploaded</p>
                        </div>
                    )}

                    {status && (
                        <p className={`text-sm font-bold ${status.includes("failed") || status.includes("Error") ? "text-red-400" : "text-emerald-400 animate-pulse"}`}>
                            {status}
                        </p>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className={`w-full py-4 rounded-2xl font-extrabold transition-all shadow-xl ${!file || uploading
                            ? "bg-white/5 text-gray-600 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] shadow-red-500/20"
                            }`}
                    >
                        {uploading ? "Uploading..." : "Publish New Resume"}
                    </button>

                    <p className="text-xs text-gray-600 italic">
                        Supported format: PDF only. Max size: 5MB.
                    </p>
                </div>
            </div>
        </div>
    );
}
