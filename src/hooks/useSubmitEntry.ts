import { useAuth } from "../contexts/AuthContext";
import { usePost } from "./usePost";

const DEFAULT_CLOCK_ID = import.meta.env.VITE_DEFAULT_CLOCK_ID || 1;

export const useSubmitEntry = () => {
  const { user } = useAuth();
  const { postData, error } = usePost(`entries`);

  const submitEntry = async (entryId: number, entryDescription: string) => {
    if (!user) {
      return { success: false, message: "Debes iniciar sesión para registrar una marca." };
    }

    try {

      await postData({
        clock_id: DEFAULT_CLOCK_ID,
        entry_type_id: entryId,
        user_uuid: user.id,
      });


      if (error){
        return  { success: false, message: `${error.message}` };
      }

      return { success: true, message: `${entryDescription} registrada correctamente!` };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Ha ocurrido un error al registrar la entrada." };
    }
  };

  return { submitEntry, error };
};
