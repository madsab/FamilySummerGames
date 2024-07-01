"use server"
import { getServerSession } from "next-auth";
import getAllUsers from "./getAllUsers";
import { checkUser } from "@/lib/checkUser";

interface PodiumResult {
    first?: {
    name: string;
    score: string;
    };
    second?: {
        name: string;
        score: string;
    };
    third?: {
        name: string;
        score: string;
    };
    error?: string;
}
async function getPodium(): Promise<PodiumResult> {
    const { user } = await checkUser();
    if (!user) {
        return {error: "No user" };
    }
    try {
        const {data, error} = await getAllUsers();
        if (error) {
            return {error};
        }
        const Barnes = data?.filter((user) => user.familyName === "Bårnes");
        const BarnesBalance = Barnes?.reduce((sum, user) => sum + user.money, 0);

        const Skraning = data?.filter((user) => user.familyName === "Skråning");
        const SkraningBalance = Skraning?.reduce((sum, user) => sum + user.money, 0);

        const Saudland = data?.filter((user) => user.familyName === "Saudland");
        const SaudlandBalance = Saudland?.reduce((sum, user) => sum + user.money, 0);


        if (BarnesBalance == undefined || SkraningBalance == undefined || SaudlandBalance == undefined) {
            return {error: "Could not calculate podium" };
        }
        const sortedPodium = [
            {name: "Bårnes", score: BarnesBalance},
            {name: "Skråning", score: SkraningBalance},
            {name: "Saudland", score: SaudlandBalance}
        ].sort((a, b) => b.score - a.score).map((family) => ({...family, score: family.score.toString()}));

        const [first, second, third] = sortedPodium;
        //Check what family the user belongs to
        if (first.name != user.familyName) {
            first.score = "?";
        }
        if (second.name != user.familyName) {
            second.score = "?";
        }
        if (third.name != user.familyName) {
            third.score = "?";
        }

        return {first, second, third};
    } catch (error) {
        return {error: "Could not calculate podium" };
    }
}

export default getPodium;