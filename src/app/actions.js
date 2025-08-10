"use server";

import { addReviewToRestaurant } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getFirestore } from "firebase/firestore";

// This is a next.js server action, which is an alpha feature, so
// use with caution.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
    // 1. Destructure both app and currentUser (or user)
    const { app, currentUser } = await getAuthenticatedAppForUser();

    // 2. Check if the user is authenticated on the server.
    if (!currentUser) {
        console.error("User must be authenticated to submit a review.");
        // Stop execution if the user is not authenticated.
        throw new Error("Authentication required.");
    }

    const db = getFirestore(app);

    await addReviewToRestaurant(db, data.get("restaurantId"), {
            text: data.get("text"),
            rating: data.get("rating"),

            // 3. Use the server-verified UID instead of the hidden form field.
            userId: currentUser.uid,
    });
}
