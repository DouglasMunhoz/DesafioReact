import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";

export const EditarCompra = () => {

    const params = useParams();
    const [CartaoId, setCartaoId] = useState(params.id)
    const [ClienteId, setClienteId] = useState(params.id);
    const [data, setdata] = useState();
    const [quantidade, setquantidade] = useState();
    const [valor, setvalor] = useState();

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api + "/compra/" + CartaoId + "/" + ClienteId,
            { CartaoId, ClienteId, data, quantidade, valor }, { headers })
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
        const getCompra = async () => {
            await axios.get(api + "/compra/" + CartaoId + "/" + ClienteId)
                .then((response) => {
                    setCartaoId(response.data.comp.CartaoId)
                    setdata(response.data.comp.data)
                    setClienteId(response.data.comp.ClienteId)
                    setquantidade(response.data.comp.quantidade)
                    setvalor(response.data.comp.valor)
                    console.log(response.data.comp.CartaoId)
                    console.log(response.data.comp.data)
                    console.log(response.data.comp.ClienteId)
                    console.log(response.data.comp.quantidade)
                    console.log(response.data.comp.valor)
                })
                .catch(() => {
                    console.log("Erro: Sem conexão com o Api")
                })
        }
        getCompra()
    }, [CartaoId, ClienteId])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
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

                <Form className="p-2" onSubmit={edtCompra}>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label> Id do Cartão </Label>
                                <Input
                                    name="CartaoId"
                                    placeholder="Id do Cartão"
                                    type="int"
                                    defaultValue={CartaoId}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label> Cliente Id </Label>
                                <Input
                                    name="ClienteId"
                                    placeholder="Id do Cliente"
                                    type="int"
                                    defaultValue={ClienteId}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Data da Compra</Label>
                                <Input
                                    name="data"
                                    placeholder="Data da Compra"
                                    type="date"
                                    value={data} onChange={e => setdata(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Quantidade </Label>
                                <Input
                                    name="quantidade"
                                    placeholder="Quantidade"
                                    type="int"
                                    value={quantidade} onChange={e => setquantidade(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Valor </Label>
                                <Input
                                    name="valor"
                                    placeholder="Valor da Compra"
                                    type="float"
                                    value={valor} onChange={e => setvalor(e.target.value)}
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