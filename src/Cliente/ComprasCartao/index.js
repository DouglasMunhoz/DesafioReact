import { Container, Table } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const ComprasCartao = () => {

    const params = useParams()

    const [data, setData] = useState([])
    const [CartaoId] = useState(params.id)
    const [setStatus] = useState({
        type: '',
        message: ''
    })

    const getCompras = async () => {
        await axios.get(api + "/cartao/" + CartaoId + "/compras")
            .then((response) => {
                console.log(response.data.comp)
                setData(response.data.comp)
            })
            .catch(() => {
                console.log("Erro sem conexação com a API.")
            })
    }

    useEffect(() => {
        getCompras()
        // eslint-disable-next-line
    }, [CartaoId])

    const delCompras = async (id) => {
        console.log(id)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/compra/" + id ,
            { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message)
                getCompras()
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
                        <h1>Compras do Cartao</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/cadastrar-compra/" + CartaoId}
                            className="m-2 btn btn-outline-info btn-sm">Inserir Compra</Link>
                        <Link to="/listar-clientes"
                            className="m-2 btn btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th> Cartao </th>
                            <th> Id da Promocao </th>
                            <th> Data da Compra </th>
                            <th> Quantidade </th>
                            <th> Valor </th>
                            <th> Data de Criaçao </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comp => (
                            <tr key={comp.CartaoId}>
                                <th scope="row">{comp.CartaoId}</th>
                                <td> {comp.PromocaoId} </td>
                                <td> {comp.data} </td>
                                <td> {comp.quantidade} </td>
                                <td> {comp.valor} </td>
                                <td> {comp.createdAt} </td>
                                <td> <Link to={"/editar-compra/" + comp.CartaoId + "/" + comp.PromocaoId}
                                    className=" btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="m-1 btn btn-outline-danger btn-sm"
                                        onClick={() => delCompras(comp.CartaoId + "/" + comp.PromocaoId)}
                                        >Excluir</span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}