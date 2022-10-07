import { Col, Container, Table } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const Promocoes = () => {

    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)
    const [setStatus] = useState({
        type: '',
        message: ''
    })

    const getPromocoes = async () => {
        await axios.get(api + "/empresa/" + id + "/promocoes")
            .then((response) => {
                console.log(response.data.prom)
                setData(response.data.prom)
            })
            .catch(() => {
                console.log("Erro sem conexação com a API.")
            })
    }

    useEffect(() => {
        getPromocoes();
        // eslint-disable-next-line
    }, [id])

    const delPromocao = async (id) => {

        console.log(id)

        await axios.delete(api + "/promocao/" + id)
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getPromocoes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossivel conectar com a API.'
                })
            })
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Promoções da Empresa</h1>
                    </div>
                    <div >
                        <div className="m-auto p-4">
                            <Col>
                                <Link to={"/empresa/" + id + "/promocao"}
                                    className="m-2 btn btn-outline-info btn-sm">Inserir Promocao</Link>
                                <Link to="/listar-empresas"
                                    className="m-2 btn btn-outline-info btn-sm">Empresas</Link>
                            </Col>
                        </div>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th> Id da Promocao </th>
                            <th> Id da Empresa </th>
                            <th> Nome </th>
                            <th> Descrição </th>
                            <th> Validade </th>
                            <th> Data de Criaçao </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(prom => (
                            <tr key={prom.id}>
                                <th scope="row">{prom.id}</th>
                                <td> {prom.EmpresaId} </td>
                                <td> {prom.nome} </td>
                                <td> {prom.descricao} </td>
                                <td> {prom.validade} </td>
                                <td> {prom.createdAt} </td>
                                <td>
                                    <Link to={"/editar-promocao/" + prom.id}
                                        className="m-1 btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="m-1 btn btn-outline-danger btn-sm"
                                        onClick={() => delPromocao(prom.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}