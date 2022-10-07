import { Container, Form, FormGroup, Label, Input, Button, Col, Row, Alert } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarPromocao = () => {

    const params = useParams();
    const [EmpresaId] = useState(params.id);

    const [promocao, setPromocao] = useState({
        empresaId: '',
        nome: '',
        descricao: '',
        validade: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setPromocao({ ...promocao, [e.target.name]: e.target.value })

    const cadPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/empresa/" + EmpresaId + "/promocao", promocao, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: (response.data.message)
                })
                setPromocao({
                    empresaId: '',
                    nome: '',
                    descricao: '',
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
                        <h1>Cadastrar Promocao</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/empresa/" + EmpresaId + "/promocoes"}
                            className="m-2 btn btn-outline-info btn-sm">Promoções</Link>
                        <Link to="/listar-empresas"
                            className="m-2 btn btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadPromocao} >

                    <div>
                        <hr className="m-1" />
                        {status.type === 'error' ?
                            <Alert color="danger"> {status.message}</Alert> : ""}
                        {status.type === 'success' ?
                            <Alert color="success"> {status.message}</Alert> : ""}
                    </div>
                    <Col md={1}>
                        <FormGroup >
                            <Label > Empresa ID </Label>
                            <Input
                                name="EmpresaId"
                                placeholder="Id da Empresa"
                                type="text"
                                defaultValue={EmpresaId}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                            <FormGroup>
                                <Label> Nome da Promocao </Label>
                                <Input
                                    name="nome"
                                    placeholder="Digite o nome da Promoção"
                                    type="text"
                                    onChange={valorInput} value={promocao.nome}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={5}>
                            <FormGroup>
                                <Label> Descrição </Label>
                                <Input
                                    name="descricao"
                                    placeholder="Digite a descrição da Promoção"
                                    type="text"
                                    onChange={valorInput} value={promocao.descricao}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label> Validade </Label>
                                <Input
                                    name="validade"
                                    placeholder="Digite a validade da Promoção"
                                    type="date"
                                    onChange={valorInput} value={promocao.validade}
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