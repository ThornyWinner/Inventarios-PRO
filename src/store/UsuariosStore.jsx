import { create } from "zustand";
import { InsertarUsuarios, supabase } from "../index";

export const useUsuariosStore = create((set, get) => ({
  insertarUsuarioAdmin: async (p) => {
    // Validaciones básicas
    if (!p.correo || !p.pass) {
      console.error("Correo o contraseña vacíos");
      return null;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: p.correo,
        password: p.pass,
      });

      if (error) {
        console.error("Error al registrar usuario:", error.message);
        return null;
      }

      console.log("Usuario autenticado creado:", data);

      const datauser = await InsertarUsuarios({
        idauth: data.user.id,
        fecha_registro: new Date().toISOString(),
        tipo_user: "admin",
      });

      return datauser;
    } catch (err) {
      console.error("Error inesperado al registrar admin:", err);
      return null;
    }
  },
}));
