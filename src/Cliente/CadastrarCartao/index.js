import { Container, Form, FormGroup, Label, Input, Button, Col, Row, Alert } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarCartao = () => {

    const params = useParams();
    const [ClienteId] = useState(params.id);

    const [cartao, setCartao] = useState({
        ClienteId: '',
        dataCartao: '',
        validade: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setCartao({ ...cartao, [e.target.name]: e.target.value })

    const cadCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cliente/" + ClienteId + "/cartao", cartao, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: (response.data.message)
                })
                setCartao({
                    ClienteId: '',
                    dataCartao: '',
                    validade: ''
                })
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API")
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API'
                })
            })
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cadastrar Cartao</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/cartoes-cliente/" + ClienteId}
                            className="m-2 btn btn-outline-info btn-sm">Cartões</Link>
                        <Link to="/listar-clientes"
                            className="m-2 btn btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadCartao} >

                    <div>
                        <hr className="m-1" />
                        {status.type === 'error' ?
                            <Alert color="danger"> {status.message}</Alert> : ""}
                        {status.type === 'success' ?
                            <Alert color="success"> {status.message}</Alert> : ""}
                    </div>

                    <Col md={1}>
                        <FormGroup >
                            <Label > Cliente ID </Label>
                            <Input
                                name="ClienteId"
                                placeholder="Id do Cliente"
                                type="text"
                                defaultValue={ClienteId}
                            />
                        </FormGroup>
                    </Col>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Data do Cartão </Label>
                                <Input
                                    name="dataCartao"
                                    placeholder="Digite a data de emissão do cartão"
                                    type="date"
                                    onChange={valorInput} value={cartao.dataCartao}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Validade </Label>
                                <Input
                                    name="validade"
                                    placeholder="Digite a validade do cartão"
                                    type="date"
                                    onChange={valorInput} value={cartao.validade}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup className="d-flex">
                        <Row>
                            <Col>
                                <Button type="submit" outline color="info"> Cadastrar </Button>
                            </Col>
                            <Col>
                                <Button type="reset" outline color="info"> Limpar </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>

            </Container>
        </div>
    )
}