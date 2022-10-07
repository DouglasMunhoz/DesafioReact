import { Col, Container, Table } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CartoesCliente = () => {

    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)
    const [setStatus] = useState({
        type: '',
        message: ''
    })


    const getCartoes = async () => {
        await axios.get(api + "/cliente/" + id + "/cartoes")
            .then((response) => {
                console.log(response.data.cartoes)
                setData(response.data.cartoes)
            })
            .catch(() => {
                console.log("Erro sem conexação com a API.")
            })
    }

    useEffect(() => {
        getCartoes()
        // eslint-disable-next-line
    }, [id])

    const delCartoes = async (id) => {
        console.log(id)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/cartao/" + id,
            { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message)
                getCartoes()
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
                        <h1>Cartões do Cliente</h1>
                    </div>
                    <div >
                        <div className="m-auto p-4">
                            <Col>
                                <Link to={"/novo-cartao/" + id}
                                    className="m-2 btn btn-outline-info btn-sm">Inserir Cartão</Link>
                                <Link to="/listar-clientes"
                                    className="m-2 btn btn-outline-info btn-sm">Clientes</Link>
                            </Col>
                        </div>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th> Cartao </th>
                            <th> Id do Cliente </th>
                            <th> Data do Cartao </th>
                            <th> Validade </th>
                            <th> Data de Criaçao </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cartoes => (
                            <tr key={cartoes.id}>
                                <th scope="row">{cartoes.id}</th>
                                <td> {cartoes.ClienteId} </td>
                                <td> {cartoes.dataCartao} </td>
                                <td> {cartoes.validade} </td>
                                <td> {cartoes.createdAt} </td>
                                <td>
                                    <Link to={"/editar-cartao/" + cartoes.id}
                                        className="m-1 btn btn-outline-warning btn-sm">Editar</Link>
                                    <Link to={"/compra-cartao/" + cartoes.id}
                                        className="m-1 btn btn-outline-info btn-sm">Compras</Link>
                                    <span className="m-1 btn btn-outline-danger btn-sm"
                                        onClick={() => delCartoes(cartoes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}