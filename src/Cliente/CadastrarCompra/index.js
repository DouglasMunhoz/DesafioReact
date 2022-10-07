import { Container, Form, FormGroup, Label, Input, Button, Col, Row, Alert } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarCompra = () => {

    const params = useParams();
    const [CartaoId] = useState(params.id);

    const [compra, setCompra] = useState({
        CartaoId: '',
        promocaoid: '',
        data: '',
        quantidade: '',
        valor: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setCompra({ ...compra, [e.target.name]: e.target.value })

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/compra/" + CartaoId, compra, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: (response.data.message)
                })
                setCompra({
                    CartaoId: '',
                    promocaoid: '',
                    data: '',
                    quantidade: '',
                    valor: ''
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
                        <h1>Cadastrar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes"
                            className="m-2 btn btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadCompra} >

                    <div>
                        <hr className="m-1" />
                        {status.type === 'error' ?
                            <Alert color="danger"> {status.message}</Alert> : ""}
                        {status.type === 'success' ?
                            <Alert color="success"> {status.message}</Alert> : ""}
                    </div>
                    <Col className="d-flex">
                        <Col md={1} className="m-1">
                            <FormGroup >
                                <Label > Cartão ID </Label>
                                <Input
                                    name="CartaoId"
                                    placeholder="Id do Cartão"
                                    type="int"
                                    defaultValue={CartaoId}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2} className="m-1">
                            <FormGroup >
                                <Label > Promoção ID </Label>
                                <Input
                                    name="promocaoid"
                                    placeholder="Id da Promoção"
                                    type="int"
                                    onChange={valorInput} value={compra.promocaoid}
                                />
                            </FormGroup>
                        </Col>
                    </Col>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Data da Compra </Label>
                                <Input
                                    name="data"
                                    placeholder="Digite a data da Compra"
                                    type="date"
                                    onChange={valorInput} value={compra.data}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Quantidade </Label>
                                <Input
                                    name="quantidade"
                                    placeholder="Digite a quantidade"
                                    type="float"
                                    onChange={valorInput} value={compra.quantidade}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label> Valor </Label>
                                <Input
                                    name="valor"
                                    placeholder="Digite o valor da compra"
                                    type="float"
                                    onChange={valorInput} value={compra.valor}
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