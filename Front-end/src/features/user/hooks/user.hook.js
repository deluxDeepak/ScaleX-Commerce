import { useEffect, useState } from "react"
import { getProfileService } from "../service/profile.service";

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [error, setError] = useState("");

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError("");
            const result = await getProfileService();
            console.log("User profile is", result);
            setUserProfile(result.user);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();

    }, [])

    return {
        loading,
        error,
        userProfile
    }

}

// const useUpdateProfile=()=>{

// }