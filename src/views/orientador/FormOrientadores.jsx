import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormOrientadores() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [idOrientador, setIdOrientador] = useState();
  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/orientadores/" + state.id)
        .then((response) => {
          setIdOrientador(response.data.id);
          setNome(response.data.nome);
          setDepartamento(response.data.departamento);
        })
        .catch((error) => {
          notifyError("Erro ao carregar os dados do orientador.");
        });
    }
  }, [state]);

  function salvar() {
    let orientadorRequest = {
      nome: nome,
      departamento: departamento,
    };

    if (idOrientador != null) {
      // Alteração
      axios
        .patch("http://localhost:8080/api/orientadores/" + idOrientador, orientadorRequest)
        .then(() => {
          notifySuccess("Orientador alterado com sucesso.");
          navigate(`/list-orientadores`); // Redireciona para a lista de orientadores
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao alterar o orientador.");
          }
        });
    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/orientadores", orientadorRequest)
        .then(() => {
          notifySuccess("Orientador cadastrado com sucesso.");
          navigate(`/list-orientadores`); // Redireciona para a lista de orientadores
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao cadastrar o orientador.");
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela="orientadores" />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idOrientador === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Orientador &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idOrientador !== undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Orientador &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Input
                required
                fluid
                label="Nome"
                maxLength="100"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <Form.Input
                required
                fluid
                label="Departamento"
                maxLength="100"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                label="Voltar"
                circular
                color="orange"
                icon="reply"
                as={Link}
                to="/list-orientadores"
              />

              <Button
                label="Salvar"
                circular
                color="blue"
                icon="save"
                floated="right"
                onClick={() => salvar()}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
