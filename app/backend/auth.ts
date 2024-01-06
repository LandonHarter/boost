import { GoogleAuthProvider, User, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function signIn() {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const additionalData = await getAdditionalUserInfo(res);
    if (additionalData?.isNewUser) {
        await createAccountData(res.user);
    }
}

async function createAccountData(user: User) {
    const { uid, displayName, photoURL, email } = user;
    const userDoc = doc(collection(firestore, "users"), uid);
    await setDoc(userDoc, {
        name: displayName,
        email,
        picture: photoURL
    });
}