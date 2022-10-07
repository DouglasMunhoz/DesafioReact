import { Container, Form, FormGroup, Label, Input, Button, Col, Row, Alert } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarEmpresa = () => {
    const [empresa, setEmpresa] = useState({
        nome: '',
        dataAdesao: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setEmpresa({ ...empresa, [e.target.name]: e.target.value })

    const cadEmpresa = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/empresas", empresa, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: (response.data.message)
                })
                setEmpresa({
                    nome: '',
                    dataAdesao: ''
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
                        <h1>Cadastrar Empresa</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="m-auto btn 
                    btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadEmpresa} >

                    <div>
                        <hr className="m-1" />
                        {status.type === 'error' ?
                            <Alert color="danger"> {status.message}</Alert> : ""}
                        {status.type === 'success' ?
                            <Alert color="success"> {status.message}</Alert> : ""}
                    </div>

                    <FormGroup >
                        <Label> Nome da Empresa </Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome do Cliente"
                            type="text"
                            onChange={valorInput} value={empresa.nome}
                        />
                    </FormGroup>
                    <Col md={3}>
                        <FormGroup>
                            <Label> Data de Adesao </Label>
                            <Input
                                name="dataAdesao"
                                placeholder="Digite a data de Adesão"
                                type="date"
                                onChange={valorInput} value={empresa.dataAdesao}
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