import axios from "axios"
import { useEffect, useState } from "react"
import { api } from "../../config"
import { Alert, Container, Table, } from "reactstrap"
import { Link } from "react-router-dom"

export const Clientes = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getClientes = async () => {
        await axios.get(api + "/clientes")
            .then((response) => {
                console.log(response.data.cli)
                setData(response.data.cli)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API'
                })
                console.log("Sem conexão com a API.")
            })

    }

    useEffect(() => {
        getClientes();
    }, [])

    const delCliente = async (idCliente) => {
        console.log(idCliente)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/cliente/" + idCliente,
            { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message)
                getClientes()
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
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Clientes</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-cliente" className="btn btn-outline-info btn-sm">Inserir Cliente</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Nome </th>
                            <th> Cidade </th>
                            <th> Uf </th>
                            <th> Nascimento </th>
                            <th> Data do Cadastro </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <th scope="row">{cli.id}</th>
                                <td> {cli.nome} </td>
                                <td> {cli.cidade} </td>
                                <td> {cli.uf} </td>
                                <td> {cli.nascimento} </td>
                                <td> {cli.createdAt} </td>
                                <td>
                                    <Link to={"/cartoes-cliente/" + cli.id}
                                        className="m-1 btn btn-outline-info btn-sm">Cartões</Link>
                                    <span className="m-1 btn btn-outline-danger btn-sm"
                                        onClick={() => delCliente(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}