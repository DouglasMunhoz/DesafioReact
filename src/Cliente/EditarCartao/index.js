import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";

export const EditarCartao = () => {

    const params = useParams();
    const [id, setId] = useState(params.id)
    const [ClienteId, setClienteId] = useState();
    const [dataCartao, setDataCartao] = useState();
    const [validade, setValidade] = useState();

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api + "/cartao/" + id,
            { id, ClienteId, dataCartao, validade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração realizada com sucesso.'
                })
                console.log(response.data.type)
                console.log(response.data.message)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possivel alterar.'
                })
            })
    }

    useEffect(() => {
        const getCartao = async () => {
            await axios.get(api + "/cartao/" + id)
                .then((response) => {
                    setId(response.data.cart.id)
                    setDataCartao(response.data.cart.dataCartao)
                    setClienteId(response.data.cart.ClienteId)
                    setValidade(response.data.cart.validade)
                    console.log(response.data.cart.id)
                    console.log(response.data.cart.dataCartao)
                    console.log(response.data.cart.ClienteId)
                    console.log(response.data.cart.validade)
                })
                .catch(() => {
                    console.log("Erro: Sem conexão com o Api")
                })
        }
        getCartao()
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cartao</h1>
                    </div>
                    <div className="p-2">
                    <Link to={"/cartoes-cliente/" + ClienteId}
                            className="m-2 btn btn-outline-info btn-sm">Cartões</Link>
                        <Link to="/listar-clientes" className="m-auto btn btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message}</Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success"> {status.message}</Alert> : ""}
                </div>

                <Form className="p-2" onSubmit={edtCartao}>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label> Id do Cartão </Label>
                                <Input
                                    name="id"
                                    placeholder="Id do Cartão"
                                    type="text"
                                    defaultValue={id}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label> Cliente Id </Label>
                                <Input
                                    name="ClienteId"
                                    placeholder="Id do Cliente"
                                    type="text"
                                    defaultValue={ClienteId}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Data do Cartao </Label>
                                <Input
                                    name="dataCartao"
                                    placeholder="Data do Cartao"
                                    type="date"
                                    value={dataCartao} onChange={e => setDataCartao(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Validade do Cartao </Label>
                                <Input
                                    name="validade"
                                    placeholder="Validade do Cartao"
                                    type="date"
                                    value={validade} onChange={e => setValidade(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Row>
                            <Col md={1}>
                                <Button type="submit" outline color="warning"> Salvar </Button>
                            </Col>
                            <Col md={1}>
                                <Button type="reset" outline color="info"> Limpar </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}