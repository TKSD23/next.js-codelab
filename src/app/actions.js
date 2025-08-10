"use server";

import { addReviewToRestaurant } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getFirestore } from "firebase/firestore";

// This is a next.js server action, which is an alpha feature, so
// use with caution.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
    const { app } = await getAuthenticatedAppForUser();
    const db = getFirestore(app);

    const restaurantId = data.get("restaurantId");
    const text = data.get("text");
    const rating = data.get("rating");
    const userId = data.get("userId"); // This is coming from the hidden field

    console.log("handleReviewFormSubmission - restaurantId:", restaurantId);
    console.log("handleReviewFormSubmission - text:", text);
    console.log("handleReviewFormSubmission - rating:", rating);
    console.log("handleReviewFormSubmission - userId:", userId); // VERY IMPORTANT

    await addReviewToRestaurant(db, restaurantId, {
      text: text,
      rating: rating,
      userId: userId,
    });
}
