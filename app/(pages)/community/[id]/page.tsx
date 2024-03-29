import { firestore } from "@/backend/firebase";
import NotFound from "@/not-found";
import { Community } from "@/types/Community";
import { collection, doc, getDoc } from "firebase/firestore";
import CommunityVerification from "./verify";

export default async function CommunityPage(context: { params: { id: string } }) {
    const community = (await getDoc(doc(collection(firestore, "communities"), context.params.id))).data() as Community | undefined;

    if (!community) {
        return (
            <NotFound />
        );
    }
    return <CommunityVerification id={context.params.id} />;
}