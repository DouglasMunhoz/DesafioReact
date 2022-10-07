import { Container, Form, FormGroup, Label, Input, Button, Col, Row, Alert } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarCliente = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        cidade: '',
        uf: '',
        nascimento: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setCliente({ ...cliente, [e.target.name]: e.target.value })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cliente", cliente, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: (response.data.message)
                })
                setCliente({
                    nome: '',
                    cidade: '',
                    uf: '',
                    nascimento: ''
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
                        <h1>Cadastrar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn 
                    btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadCliente} >

                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message}</Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success"> {status.message}</Alert> : ""}
                </div>

                    <FormGroup >
                        <Label> Nome </Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome do Cliente"
                            type="text"
                            onChange={valorInput} value={cliente.nome}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label> Cidade </Label>
                                <Input
                                    name="cidade"
                                    placeholder="Digite a cidade"
                                    type="text"
                                    onChange={valorInput} value={cliente.cidade}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label> UF </Label>
                                <Input
                                    name="uf"
                                    placeholder="Digite o estado"
                                    type="text"
                                    onChange={valorInput} value={cliente.uf}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label> Data de Nascimento </Label>
                            <Input
                                name="nascimento"
                                placeholder="Digite a data de Nascimento"
                                type="date"
                                onChange={valorInput} value={cliente.nascimento}
                            />
                        </FormGroup>
                    </Col>
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