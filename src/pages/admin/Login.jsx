import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, setPersistence, browserSessionPersistence } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

    const handleLogin = async () => {
        try {
            setError(""); // Reset error

            // Set session-based persistence (logs out when tab/browser is closed)
            await setPersistence(auth, browserSessionPersistence);

            const result = await signInWithPopup(auth, googleProvider);

            // Strict email verification
            if (result.user.email === ADMIN_EMAIL) {
                navigate("/admin");
            } else {
                setError(`Access Denied: You are not Bhuvaneswar. Access is strictly limited.`);
                await auth.signOut();
            }
        } catch (err) {
            console.error("Firebase Login Error:", err);
            if (err.code === "auth/operation-not-allowed") {
                setError("Login failed: Google Sign-In is not enabled.");
            } else if (err.code === "auth/popup-closed-by-user") {
                setError("Login failed: Popup was closed.");
            } else {
                setError(`Login failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-center">
                <h1 className="text-4xl font-extrabold text-white mb-6">Admin <span className="text-cyan-400">Login</span></h1>
                <p className="text-gray-400 mb-10">Sign in to manage your portfolio content.</p>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-6 h-6" />
                    Sign in with Google
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 text-gray-500 hover:text-white transition-colors text-sm font-medium"
                >
                    Back to Website
                </button>
            </div>
        </div>
    );
}
