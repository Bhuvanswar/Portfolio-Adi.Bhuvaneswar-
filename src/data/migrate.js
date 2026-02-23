// import { projectsData } from "./projects"; // Data has been migrated and file removed
// import { achievementsData } from "./achievements";
const projectsData = [];
const achievementsData = [];

export const migrateData = async () => {
    try {
        console.log("Starting migration...");

        // 1. Migrate Projects
        const projectsCol = collection(db, "projects");
        const projectSnap = await getDocs(projectsCol);

        if (projectSnap.empty) {
            for (const project of projectsData) {
                const { id, ...data } = project; // Remove static id
                await addDoc(projectsCol, data);
            }
            console.log("Projects migrated successfully!");
        } else {
            console.log("Projects collection not empty, skipping migration.");
        }

        // 2. Migrate Achievements
        const achievementsCol = collection(db, "achievements");
        const achievementSnap = await getDocs(achievementsCol);

        if (achievementSnap.empty) {
            for (const achievement of achievementsData) {
                const { id, images, ...data } = achievement; // Remove static id and local images
                // Note: local image refs (s1, s2) won't work in Firestore directly
                // We'll just migrate the text for now
                await addDoc(achievementsCol, data);
            }
            console.log("Achievements migrated successfully!");
        } else {
            console.log("Achievements collection not empty, skipping migration.");
        }

        return { success: true, message: "Migration check complete." };
    } catch (err) {
        console.error("Migration failed:", err);
        return { success: false, error: err.message };
    }
};
