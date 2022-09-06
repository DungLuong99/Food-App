import {
    doc,
    getDocs,
    setDoc,
    query,
    collection,
    orderBy
} from "firebase/firestore"
import { fireStore } from "~/firebase.config"

// Saving new Item
const saveItem = async (data) => {
    await setDoc(doc(fireStore, 'foodItems', `${Date.now()}`), data, {
        merge: true,
    });
};

//getall food items
const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(fireStore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};
export { saveItem, getAllFoodItems }