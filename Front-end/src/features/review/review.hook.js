import { useEffect, useState } from "react"
import { getMyReviewService } from "./review.service";

export const useReview = () => {

    const [review, setReview] = useState([]);
    const [laoding, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getMyReviewService();
                console.log("Review response is ", result);
                setReview(result.reviews);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        fetchReview();
    }, []);

    return {
        laoding,
        review,
        error
    }


}