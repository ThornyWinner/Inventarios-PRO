import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useUsuariosStore
} from "../../../index";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function RegistrarAdmin({ setState }) {
  const { insertarUsuarioAdmin } = useUsuariosStore();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const p = {
        correo: data.correo.trim(),
        pass: data.pass,
      };

      const dt = await insertarUsuarioAdmin(p);
      if (dt) {
        navigate("/"); // Redirige al HomeTemplate
      } else {
        alert("Error al registrar al usuario. Verifica los datos.");
      }
    },
  });

  return (
    <Container>
      <ContentClose>
        <span onClick={setState}>x</span>
      </ContentClose>
      <section className="subcontainer">
        <div className="headers">
          <section>
            <h1>Registrar usuario</h1>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(mutation.mutateAsync)}>
          <section>
            <article>
              <InputText icono={<MdAlternateEmail />}>
                <input
                  className="form__field"
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  placeholder="correo"
                  {...register("correo", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                <label className="form__label">email</label>
                {errors.correo?.type === "pattern" && (
                  <p>El formato del email es incorrecto</p>
                )}
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<RiLockPasswordLine />}>
                <input
                  className="form__field"
                  type="password"
                  placeholder="Contraseña"
                  {...register("pass", {
                    required: true,
                    minLength: 6,
                  })}
                />
                <label className="form__label">Contraseña</label>
                {errors.pass?.type === "required" && <p>Campo requerido</p>}
                {errors.pass?.type === "minLength" && (
                  <p>La contraseña debe tener al menos 6 caracteres</p>
                )}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ff7556"
              />
            </div>
          </section>
        </form>
      </section>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display: flex;
  align-items: center;

  .subcontainer {
    width: 100%;
  }

  .headers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 20px;
      font-weight: 500;
    }

    span {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .formulario {
    section {
      gap: 20px;
      display: flex;
      flex-direction: column;

      .colorContainer {
        .colorPickerContent {
          padding-top: 15px;
          min-height: 50px;
        }
      }
    }
  }
`;

const ContentClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 33px;
  margin: 30px;
  cursor: pointer;
`;
